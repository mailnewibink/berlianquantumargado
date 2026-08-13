-- Create the assets table
CREATE TABLE public.assets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  filename text NOT NULL,
  storage_path text NOT NULL,
  public_url text NOT NULL,
  title text,
  description text,
  alt_text text,
  category text,
  tags text[],
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the projects table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  category text,
  location text,
  year text,
  cover_asset_id uuid REFERENCES public.assets(id) ON DELETE SET NULL,
  status text DEFAULT 'Draft' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the products table
CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  category text,
  specifications text,
  cover_asset_id uuid REFERENCES public.assets(id) ON DELETE SET NULL,
  status text DEFAULT 'Draft' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the project_assets junction table
CREATE TABLE public.project_assets (
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  asset_id uuid REFERENCES public.assets(id) ON DELETE CASCADE,
  sort_order integer DEFAULT 0,
  PRIMARY KEY (project_id, asset_id)
);

-- Create the product_assets junction table
CREATE TABLE public.product_assets (
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  asset_id uuid REFERENCES public.assets(id) ON DELETE CASCADE,
  sort_order integer DEFAULT 0,
  PRIMARY KEY (product_id, asset_id)
);

-- Create the gallery_items table
CREATE TABLE public.gallery_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id uuid REFERENCES public.assets(id) ON DELETE CASCADE NOT NULL,
  category text,
  title text,
  description text,
  sort_order integer DEFAULT 0,
  status text DEFAULT 'Draft' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS setup (Row Level Security)
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published items
CREATE POLICY "Allow public read access to assets" ON public.assets FOR SELECT USING (true);
CREATE POLICY "Allow public read access to published projects" ON public.projects FOR SELECT USING (status = 'Published');
CREATE POLICY "Allow public read access to published products" ON public.products FOR SELECT USING (status = 'Published');
CREATE POLICY "Allow public read access to project assets" ON public.project_assets FOR SELECT USING (
  project_id IN (SELECT id FROM public.projects WHERE status = 'Published')
);
CREATE POLICY "Allow public read access to product assets" ON public.product_assets FOR SELECT USING (
  product_id IN (SELECT id FROM public.products WHERE status = 'Published')
);
CREATE POLICY "Allow public read access to published gallery items" ON public.gallery_items FOR SELECT USING (status = 'Published');

-- Allow authenticated admins full access to everything
CREATE POLICY "Allow authenticated full access to assets" ON public.assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to products" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to project assets" ON public.project_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to product assets" ON public.product_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access to gallery items" ON public.gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create a storage bucket called 'assets'
INSERT INTO storage.buckets (id, name, public) VALUES ('assets', 'assets', true) ON CONFLICT DO NOTHING;

-- Storage RLS policies
CREATE POLICY "Allow public viewing of assets" ON storage.objects FOR SELECT USING (bucket_id = 'assets');
CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'assets');
CREATE POLICY "Allow authenticated updates" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'assets');
CREATE POLICY "Allow authenticated deletes" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'assets');
