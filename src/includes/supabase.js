import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_ASTRAVITA_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_ASTRAVITA_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const auth = supabase.auth;
const perfilUsuario = supabase.from('perfil_usuario');

export {
    auth, perfilUsuario
}