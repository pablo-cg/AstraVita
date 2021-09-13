import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_ASTRAVITA_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_ASTRAVITA_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);