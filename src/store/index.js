import { createStore } from 'vuex'
import { supabase } from "../includes/supabase";

export default createStore({
    state: {
        usuarioConectado: false,
    },
    mutations: {
        cambiarEstadoUsuario(state) {
            state.usuarioConectado = !state.usuarioConectado;
        }
    },
    actions: {
        async registrarUsuario({ dispatch }, payload) {
            const { error } = await supabase.auth.signUp({
                email: payload.correoElectronico,
                password: payload.contrasena,
            });
            if (error) {
                throw error;
            }

            await supabase.from('perfil_usuario').insert([
                {
                    id: supabase.auth.user().id,
                    nombre: payload.nombre,
                    correo: payload.correoElectronico,
                    lugar_nac: `${payload.ciudadSeleccionada.nombre}, ${payload.regionSeleccionada.nombre}`,
                    id_lugar_nac: payload.ciudadSeleccionada.id,
                    fecha_nac: payload.fechaNac,
                    hora_nac: payload.horaNac
                },
            ]);
            await dispatch('cerrarSesion');
        },
        async iniciarSesion({ commit }, payload) {
            const { error } = await supabase.auth.signIn({
                email: payload.correo,
                password: payload.contrasena,
            });
            if (error) {
                throw error;
            }
            commit('cambiarEstadoUsuario');
        },
        async cerrarSesion(){
            await supabase.auth.signOut();
        },
        usuarioEstaConectado({ commit }) {
            const usuario = supabase.auth.user();
            if (usuario) {
                commit('cambiarEstadoUsuario');
            }
        }
    },
    modules: {

    },
})
