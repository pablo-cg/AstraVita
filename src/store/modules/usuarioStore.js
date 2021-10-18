import { supabase } from "../../includes/supabase";

export default {
    namespaced: true,
    state: {
        usuarioConectado: false,
        usuario: null,
    },
    mutations: {
        cambiarEstadoUsuario(state) {
            state.usuarioConectado = !state.usuarioConectado;
        },
        setUsuario(state, payload) {
            state.usuario = payload
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
                    hora_nac: payload.horaNac,
                    esta_suscrito: false
                },
            ]);
            await dispatch('cerrarSesion');
        },

        async modificarNombreUsuario({ commit }, payload) {
            try {
                const { data, error } = await supabase
                    .from("perfil_usuario")
                    .update({ nombre: payload, updated_at: new Date() })
                    .match({ id: supabase.auth.user().id });
                if (error) throw error;
                commit('setUsuario', ...data);
            } catch (error) {
                console.log(error);
            }
        },

        async iniciarSesion({ commit, dispatch }, payload) {
            const { error } = await supabase.auth.signIn({
                email: payload.correo,
                password: payload.contrasena,
            });
            if (error) {
                throw error;
            }
            commit('cambiarEstadoUsuario');
            await dispatch('datosUsuario');
        },

        async cerrarSesion({ commit }) {
            await supabase.auth.signOut();
            commit('cambiarEstadoUsuario');
            commit('setUsuario', null);
            commit('cartaAstralStore/setCartaAstral', null, { root: true });
            commit('cartaAstralStore/setAspectos', null, { root: true });
            commit('cartaAstralStore/setGrupos', null, { root: true });
        },
        async datosUsuario({ commit }) {
            const { data } = await supabase
                .from("perfil_usuario")
                .select()
                .eq("id", supabase.auth.user().id)
                .single();
            if (data) {
                commit('setUsuario', data);
            }
        },
        async usuarioEstaConectado({ commit, dispatch }) {
            const usuario = supabase.auth.user();
            if (usuario) {
                await dispatch('datosUsuario');
                commit('cambiarEstadoUsuario');
            }
        }
    },
}