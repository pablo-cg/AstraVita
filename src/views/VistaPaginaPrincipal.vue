<template>
    <div class="container">
        <CarouselInicio :nombreUsuario="usuario.nombre" />
        <UltimosPosts v-if="ultimosPosts" :posts="ultimosPosts" />
        <CardInfoAstravita />
        <CardNovedades />
    </div>
</template>
<script>
import { mapState } from "vuex";
import { supabase } from "@/includes/supabase";
import CarouselInicio from "@/components/CarouselInicio.vue";
import UltimosPosts from "@/components/UltimosPosts.vue";
import CardInfoAstravita from "@/components/CardInfoAstravita.vue";
import CardNovedades from '@/components/CardNovedades.vue'

export default {
    data() {
        return {
            ultimosPosts: null,
        };
    },
    components: {
        CarouselInicio,
        UltimosPosts,
        CardInfoAstravita,
        CardNovedades,
    },
    computed: {
        ...mapState("usuarioStore", ["usuario"]),
    },
    methods: {
        async obtenerUltimosPosts() {
            try {
                const { data, error } = await supabase.rpc("ultimos_posts", {
                    limite: 5,
                    usuario: this.usuario.id,
                });

                if (error) console.error(error);
                if (data.length > 0) {
                    this.ultimosPosts = data;
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        await this.obtenerUltimosPosts();
    },
};
</script>