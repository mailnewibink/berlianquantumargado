export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assets: {
        Row: any; Insert: any; Update: any;
      }
      projects: {
        Row: any; Insert: any; Update: any;
      }
      products: {
        Row: any; Insert: any; Update: any;
      }
      project_assets: {
        Row: any; Insert: any; Update: any;
      }
      product_assets: {
        Row: any; Insert: any; Update: any;
      }
      gallery_items: {
        Row: any; Insert: any; Update: any;
      }
      services: {
        Row: any; Insert: any; Update: any;
      }
      rentals: {
        Row: any; Insert: any; Update: any;
      }
      project_services: {
        Row: any; Insert: any; Update: any;
      }
      project_products: {
        Row: any; Insert: any; Update: any;
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
