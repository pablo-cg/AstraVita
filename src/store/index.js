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
        async registrarUsuario({ commit }, payload) {
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
                    lugar_nac: `${payload.comunaSeleccionada.nombre}, ${payload.regionSeleccionada.nombre}`,
                    latitud_lugar_nac: payload.comunaSeleccionada.latitud,
                    longitud_lugar_nac: payload.comunaSeleccionada.longitud,
                    fecha_hora_nac: new Date(
                        `${payload.fechaNac}T${payload.horaNac}`
                    ).toJSON(),
                },
            ]);
            commit('cambiarEstadoUsuario');
        }
    },
    modules: {

    },
})
