-- Migration V2: CMS Expansion
-- Adding Services, Rentals, and Relationships

-- 1. Modify existing `assets` table
ALTER TABLE public.assets
ADD COLUMN IF NOT EXISTS mime_type text,
ADD COLUMN IF NOT EXISTS file_size bigint;

-- 2. Modify existing `products` table
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS gallery_assets uuid[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_available boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 3. Modify existing `projects` table
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS client text,
-- location and year already exist
ADD COLUMN IF NOT EXISTS gallery_assets uuid[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 4. Create `services` table
CREATE TABLE IF NOT EXISTS public.services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  description text,
  category text,
  cover_asset_id uuid REFERENCES public.assets(id) ON DELETE SET NULL,
  gallery_assets uuid[] DEFAULT '{}',
  features text[],
  is_active boolean DEFAULT true,
  status text DEFAULT 'Published' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create `rentals` table
CREATE TABLE IF NOT EXISTS public.rentals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  description text,
  category text,
  cover_asset_id uuid REFERENCES public.assets(id) ON DELETE SET NULL,
  gallery_assets uuid[] DEFAULT '{}',
  specifications text,
  availability_status text DEFAULT 'AVAILABLE',
  rental_terms text,
  is_active boolean DEFAULT true,
  status text DEFAULT 'Published' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create junction tables for Project relations
CREATE TABLE IF NOT EXISTS public.project_services (
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  service_id uuid REFERENCES public.services(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, service_id)
);

CREATE TABLE IF NOT EXISTS public.project_products (
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, product_id)
);

-- 7. Setup RLS (Row Level Security)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_products ENABLE ROW LEVEL SECURITY;

-- 8. RLS Policies for Services
CREATE POLICY "Allow public read access to active services" ON public.services 
  FOR SELECT USING (is_active = true AND status = 'Published');
CREATE POLICY "Allow authenticated full access to services" ON public.services 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 9. RLS Policies for Rentals
CREATE POLICY "Allow public read access to active rentals" ON public.rentals 
  FOR SELECT USING (is_active = true AND status = 'Published');
CREATE POLICY "Allow authenticated full access to rentals" ON public.rentals 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. RLS Policies for Project relationships
CREATE POLICY "Allow public read access to project_services" ON public.project_services 
  FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to project_services" ON public.project_services 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read access to project_products" ON public.project_products 
  FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to project_products" ON public.project_products 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
