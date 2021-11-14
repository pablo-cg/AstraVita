import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_ASTRAVITA_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.VUE_APP_ASTRAVITA_SUPABASE_SERVICE_KEY;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);