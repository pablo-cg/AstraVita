<template>
    <h1 class="text-light">
        {{ nombreGrupo }}
    </h1>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <nuevo-post></nuevo-post>
        <post
            class="col mt-3"
            v-for="post in posts"
            :key="post.id"
            :post="post"
        ></post>
        <VueEternalLoading :load="getPosts"></VueEternalLoading>
        <div class="no-more text-light text-center fw-bold">
            <i class="fas fa-frown"></i> No hay más que mostrar. <i class="fas fa-frown"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { supabase } from "../includes/supabase";
import { VueEternalLoading } from "@ts-pro/vue-eternal-loading";

import Post from "../components/GrupoPost.vue";
import NuevoPost from "../components/GrupoNuevoPost.vue";

export default {
    data() {
        return {
            postInicio: 0,
            postFin: 5,
            posts: [],
            nombreGrupo: null,
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
                    console.log(loaded);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted() {
        const data = this.grupos.find(
            (data) => data.grupo.id == this.$route.params.id
        );
        this.nombreGrupo = data.grupo.nombre;
        document.title = `${this.nombreGrupo} - AstraVita`;
    },
};
</script>

<style>
</style>