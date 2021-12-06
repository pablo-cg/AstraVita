<template>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div v-if="!post">error inesperado</div>
        <div
            class="mt-4 p-5 text-white rounded"
            style="background-color: #5548a4; border-color: slateblue"
            v-else
        >
            <div class="row">
                <div class="col">
                    <h1 v-if="post.es_anonimo">Anónimo</h1>
                    <h1 v-else>{{ post.nombre_usuario }}</h1>
                    <h5>Nos comparte:</h5>
                </div>
                <div class="col text-end">
                    <router-link
                        :to="{ name: 'Grupo', params: { id: post.id_grupo } }"
                    >
                        <button type="button" class="btn btn-light">
                            Volver a {{nombreGrupo}}
                            <i class="fas fa-long-arrow-alt-left"></i>
                        </button>
                    </router-link>
                </div>
            </div>
            <p>
                {{ post.contenido }}
            </p>
            <p class="text-end">
                <span class="badge rounded-pill bg-light text-dark"
                    ><i class="fas fa-clock"></i>
                    {{ creadoEl(new Date(post.created_at)) }}</span
                >
            </p>
        </div>
        <nuevo-comentario
            @nuevoComentario="actualizarComentarios"
            class="col mt-3 sticky-top"
        ></nuevo-comentario>

        <comentario
            class="col mt-3"
            v-for="comentario in comentarios"
            :key="comentario.id"
            :comentario="comentario"
            :idUsuario="post.id_usuario"
        ></comentario>
        <VueEternalLoading :load="getComentarios"></VueEternalLoading>
        <div class="no-more text-light text-center fw-bold">
            <i class="fas fa-frown"></i> No hay más que mostrar.
            <i class="fas fa-frown"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { supabase } from "../includes/supabase";
import { VueEternalLoading } from "@ts-pro/vue-eternal-loading";

import NuevoComentario from "../components/PostNuevoComentario.vue";
import Comentario from "../components/PostComentario.vue";

export default {
    data() {
        return {
            comentarioInicio: 0,
            comentarioFin: 5,
            comentarios: [],
            idPlaneta: -1,
            post: null,
            nombreGrupo: ''
        };
    },
    components: {
        VueEternalLoading,
        NuevoComentario,
        Comentario,
    },
    computed: {
        ...mapState("cartaAstralStore", ["grupos"]),
    },
    methods: {
        creadoEl(fecha) {
            const nuevaFecha = fecha.toLocaleString();
            return nuevaFecha;
        },

        async getComentarios({ loaded }) {
            try {
                const { data: comentarios, error } = await supabase
                    .from("comentario")
                    .select()
                    .eq("id_post", this.$route.params.id)
                    .range(this.comentarioInicio, this.comentarioFin)
                    .order("created_at", { ascending: false });
                if (error) throw error;
                if (comentarios.length) {
                    this.comentarios.push(...comentarios);
                    this.comentarioInicio += 5;
                    this.comentarioFin += 5;
                    loaded(comentarios.length, 5);
                }
            } catch (error) {
                console.log(error);
            }
        },
        actualizarComentarios(nuevoComentario) {
            this.comentarios.unshift(...nuevoComentario);
        },
    },
    async mounted() {
        try {
            const { data: post, error } = await supabase
                .from("post")
                .select()
                .eq("id", this.$route.params.id)
                .single();
            if (error) throw error;
            if (post) {
                this.post = post;
            }
        } catch (error) {
            console.log(error);
        }
        if (this.post.es_anonimo) {
            document.title = `Publicación anónima`;
        } else {
            document.title = `Publicación de ${this.post.nombre_usuario}`;
        }
        const data = this.grupos.find(
            (data) => data.grupo.id == this.post.id_grupo
        );
        this.nombreGrupo = data.grupo.nombre;
    },
};
</script>

<style>
</style>