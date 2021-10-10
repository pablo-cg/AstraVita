<template>
    <h1 class="text-light" @click="getPosts($route.params.id)">
        {{ nombreGrupo }}
    </h1>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <nuevo-post> </nuevo-post>
        <post
            class="col mt-3"
            v-for="post in posts"
            :key="post.id"
            :post="post"
        ></post>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { supabase } from "../includes/supabase";
import Post from "../components/GrupoPost.vue";
import NuevoPost from "../components/GrupoNuevoPost.vue";

export default {
    data() {
        return {
            posts: null,
            nombreGrupo: null,
        };
    },
    components: {
        Post,
        NuevoPost,
    },
    computed: {
        ...mapState("cartaAstralStore", ["grupos"]),
    },
    methods: {
        async getPosts(idGrupo) {
            try {
                const { data: posts, error } = await supabase
                    .from("post")
                    .select()
                    .eq("id_grupo", idGrupo);
                if (error) throw error;
                this.posts = posts;
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