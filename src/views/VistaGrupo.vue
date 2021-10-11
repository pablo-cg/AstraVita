<template>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div
            class="mt-4 p-5 text-white rounded"
            style="background-color: #5548a4; border-color: slateblue"
        >
            <div class="row">
                <div class="col">
                    <h1>{{ nombreGrupo }}</h1>
                </div>
                <div class="col text-end">
                    <router-link :to="{ name: 'Grupos' }">
                        <button type="button" class="btn btn-light">
                            Volver a Grupos
                            <i class="fas fa-long-arrow-alt-left"></i>
                        </button>
                    </router-link>
                </div>
            </div>
            <p v-html="textoPlaneta[idPlaneta]"></p>
        </div>
        <nuevo-post
            @nuevoPost="actualizarPosts"
            class="col mt-3 sticky-top"
        ></nuevo-post>

        <post
            class="col mt-3"
            v-for="post in posts"
            :key="post.id"
            :post="post"
        ></post>
        <VueEternalLoading :load="getPosts"></VueEternalLoading>
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
import textoPlaneta from "../assets/planetas/textoPlaneta.json";

import Post from "../components/GrupoPost.vue";
import NuevoPost from "../components/GrupoNuevoPost.vue";

export default {
    data() {
        return {
            postInicio: 0,
            postFin: 5,
            posts: [],
            nombreGrupo: null,
            descripcionGrupo: null,
            idPlaneta: -1,
            textoPlaneta,
        };
    },
    components: {
        Post,
        NuevoPost,
        VueEternalLoading,
    },
    computed: {
        ...mapState("cartaAstralStore", ["grupos"]),
    },
    methods: {
        async getPosts({ loaded }) {
            try {
                const { data: posts, error } = await supabase
                    .from("post")
                    .select()
                    .eq("id_grupo", this.$route.params.id)
                    .range(this.postInicio, this.postFin)
                    .order("created_at", { ascending: false });
                if (error) throw error;
                if (posts.length) {
                    this.posts.push(...posts);
                    this.postInicio += 5;
                    this.postFin += 5;
                    loaded(posts.length, 5);
                }
            } catch (error) {
                console.log(error);
            }
        },

        actualizarPosts(nuevoPost) {
            this.posts.unshift(...nuevoPost);
        },
    },
    async mounted() {
        const data = this.grupos.find(
            (data) => data.grupo.id == this.$route.params.id
        );
        this.nombreGrupo = data.grupo.nombre;
        this.descripcionGrupo = data.grupo.descripcion;
        this.idPlaneta = data.grupo.id_planeta;
        document.title = `${this.nombreGrupo} - AstraVita`;
    },
};
</script>

<style>
</style>