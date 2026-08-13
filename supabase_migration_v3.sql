-- Migration V3: Add missing fields for Phase 2 CMS

-- 1. Add missing fields to `services`
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS technical_details text,
ADD COLUMN IF NOT EXISTS applications text[],
ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- 2. Add missing fields to `products`
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS sku text,
ADD COLUMN IF NOT EXISTS applications text[],
ADD COLUMN IF NOT EXISTS features text[],
ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- 3. Add missing fields to `rentals`
ALTER TABLE public.rentals
ADD COLUMN IF NOT EXISTS applications text[],
ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- 4. Add missing fields to `projects`
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0;

-- Update RLS policies (No new policies needed as the tables already have full access for authenticated admins)
