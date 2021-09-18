<template>
    <div>
        <div class="mb-2">
            <perfil-cabecera :usuario="usuario"></perfil-cabecera>
        </div>
        <div>
            <perfil-resumen-astral
                :carta-astral="cartaAstral"
            ></perfil-resumen-astral>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import PerfilCabecera from "../components/PerfilCabecera.vue";
import PerfilResumenAstral from "../components/PerfilResumenAstral.vue";
import { supabase } from "../includes/supabase";

export default {
    components: {
        PerfilCabecera,
        PerfilResumenAstral,
    },
    data() {
        return {
            cartaAstral: null,
        };
    },
    methods: {
       
    },
    computed: {
        ...mapState(["usuario"]),
    },
    async mounted() {
        const carta = await supabase
            .from("perfil_astral")
            .select("carta_astral")
            .eq("id_usuario", supabase.auth.user().id)
            .single();
        if (carta.data) {
            this.cartaAstral = carta.data.carta_astral;
        }
    },
};
</script>