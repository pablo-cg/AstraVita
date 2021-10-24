<template>
    <div class="card">
        <h5 class="card-header row">
            <div class="col" v-if="post.es_anonimo">
                <i class="fas fa-user-secret"></i> Anónimo
                {{ post.id_usuario.substring(0, 7) }} dice:
            </div>
            <div class="col" v-else>
                <i class="fas fa-user"></i>&nbsp;
                <router-link
                    :to="
                        idUsuario == post.id_usuario
                            ? {
                                  name: 'PerfilUsuarioInicio',
                                  params: { id: '#' },
                              }
                            : {
                                  name: 'Perfil',
                                  params: { idUsuario: post.id_usuario },
                              }
                    "
                    >{{ post.nombre_usuario }}
                </router-link>
                dice:
            </div>
            <div class="col text-end">
                <i class="fas fa-clock"></i>
                {{ creadoEl(new Date(post.created_at)) }}
            </div>
        </h5>
        <div class="card-body">
            <p>{{ post.contenido }}</p>
            <p class="text-end">
                <button
                    class="btn astra-btn-primario col"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#collapse' + post.id"
                    aria-expanded="false"
                    :aria-controls="'collapse' + post.id"
                    @click="obtenerComentarios(post.id)"
                >
                    Ver últimos comentarios
                </button>
            </p>
            <div class="collapse" :id="'collapse' + post.id">
                <div class="card card-body">
                    <p v-if="!comentarios" class="text-center fw-bold">
                        No hay comentarios
                    </p>
                    <p v-else>
                        <Comentario
                            v-for="comentario in comentarios"
                            :key="comentario.id"
                            :comentario="comentario"
                            :idUsuario="idUsuario"
                            class="mt-3"
                        />
                    </p>
                    <div>
                        <router-link
                            :to="{
                                name: 'Publicacion',
                                params: { id: post.id },
                            }"
                        >
                            <button
                                class="btn astra-btn-primario mt-3"
                                type="button"
                            >
                                Unirse a la discusión
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from "../includes/supabase";
import Comentario from "./PostComentario.vue";
export default {
    props: ["post", "idUsuario"],
    components: {
        Comentario,
    },
    data() {
        return {
            comentarios: null,
        };
    },
    methods: {
        creadoEl(fecha) {
            const nuevaFecha = fecha.toLocaleString();
            return nuevaFecha;
        },

        async obtenerComentarios(idPost) {
            this.comentarios = [];
            try {
                const { data: comentarios, error } = await supabase
                    .from("comentario")
                    .select()
                    .eq("id_post", idPost)
                    .range(0, 2)
                    .order("created_at", { ascending: false });
                if (error) throw error;
                if (comentarios.length) {
                    this.comentarios.push(...comentarios);
                } else {
                    this.comentarios = null;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
.astra-btn-primario {
    background-color: slateblue;
    border-color: slateblue;
    color: whitesmoke;
}

.astra-btn-primario:hover {
    background-color: whitesmoke;
    border-color: slateblue;
    color: black;
}

.astra-btn-secundario {
    background-color: whitesmoke;
    border-color: slateblue;
    color: black;
}
.astra-btn-secundario:hover {
    background-color: slateblue;
    border-color: slateblue;
    color: whitesmoke;
}
</style>