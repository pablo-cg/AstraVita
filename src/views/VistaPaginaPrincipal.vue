<template>
    <div class="container">
        <AlertaSuscripcion v-if="status" :status="status"/>
        <CarouselInicio :nombreUsuario="usuario.nombre" />
        <UltimosPosts v-if="ultimosPosts" :posts="ultimosPosts" :usuario_premium="usuario.esta_suscrito"/>
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
import CardNovedades from "@/components/CardNovedades.vue";
import AlertaSuscripcion from '@/components/AlertaSuscripcion.vue'

export default {
    data() {
        return {
            ultimosPosts: null,
            status: null,
        };
    },
    components: {
        CarouselInicio,
        UltimosPosts,
        CardInfoAstravita,
        CardNovedades,
        AlertaSuscripcion,
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
        this.status = this.$route.params.status;
    },
};
</script>