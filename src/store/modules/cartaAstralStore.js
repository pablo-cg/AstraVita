import { supabase } from "../../includes/supabase"

export default {
    namespaced: true,
    state: {
        cartaAstral: null,
        aspectos: null,
        grupos: null,
    },
    mutations: {
        setCartaAstral(state, payload) {
            state.cartaAstral = payload;
        },
        setAspectos(state, payload) {
            state.aspectos = payload;
        },
        setGrupos(state, payload) {
            state.grupos = payload;
        },
    },
    actions: {
        async obtenerCartaAspectos({ commit }, payload) {
            try {
                const { data: perfil_astral, error } = await supabase
                    .from("perfil_astral")
                    .select("carta_astral, aspectos")
                    .eq("id_usuario", payload)
                    .single();
                if (perfil_astral) {
                    commit('setCartaAstral', perfil_astral.carta_astral);
                    commit('setAspectos', perfil_astral.aspectos);
                }

                if (error) throw error;
            } catch (error) {
                console.log(error);
            }
        },

        async obtenerGruposUsuario({ commit }, payload) {
            try {
                const { data: grupo, error } = await supabase
                    .from("usuario_en_grupo")
                    .select(`grupo(*)`)
                    .order('id_grupo', { ascending: true })
                    .eq("id_usuario", payload);

                if (error) throw error;
                commit("setGrupos", grupo)
            } catch (error) {
                console.log(error);
            }
        },

        async calcularCartaAstral({ commit, dispatch }, payload) {
            const opcionesRequest = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.VUE_APP_ASTROAPI_KEY,
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    name: payload.nombre,
                    date: payload.fecha_nac,
                    time: payload.hora_nac.slice(0, -3),
                    place_id: payload.id_lugar_nac,
                    lang: "en",
                    system: "p",
                }),
            };

            try {
                const carta = await fetch(
                    process.env.VUE_APP_ASTROAPI_URL,
                    opcionesRequest
                ).then((response) => response.json());

                let aspectos = [];

                for (const a of carta.aspects) {
                    if (a.aspect != 7) {
                        let { data: guia_aspecto, error } = await supabase
                            .from("guia_aspecto")
                            .select("descripcion")
                            .eq("id_planeta1", a.planet1)
                            .eq("id_aspecto", a.aspect)
                            .eq("id_planeta2", a.planet2);

                        if (guia_aspecto[0]) {
                            aspectos.push({
                                titulo: `${a.planet1Name} ${a.aspectName} ${a.planet2Name}`,
                                descripcion: guia_aspecto[0].descripcion,
                            });
                        }

                        if (error) {
                            console.log(error);
                        }
                    }
                }

                let grupos = [];

                for (const planeta of carta.planets) {
                    if (planeta.planetId <= 9) {
                        const { data: grupo } = await supabase
                            .from('grupo')
                            .select('id')
                            .eq('id_planeta', planeta.planetId)
                            .eq('id_signo', planeta.signId);

                        const { error } = await supabase
                            .from('usuario_en_grupo')
                            .insert([{
                                id_grupo: grupo[0].id,
                                id_usuario: payload.id
                            }])
                        if (error) throw error;
                    }
                }

                const { error } = await supabase
                    .from("perfil_astral")
                    .insert([
                        {
                            carta_astral: carta,
                            id_usuario: payload.id,
                            aspectos: aspectos,
                        },
                    ]);

                if (error) throw error;

                commit('setCartaAstral', carta);
                commit('setAspectos', aspectos);
                dispatch('obtenerGruposUsuario', payload.id)
            } catch (error) {
                console.log(error);
            }
        },

    }
}