import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Website {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
