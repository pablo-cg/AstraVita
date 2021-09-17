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
            usuario: null,
            cartaAstral: null,
        };
    },
    async mounted() {
        const { data } = await supabase
            .from("perfil_usuario")
            .select()
            .eq("id", supabase.auth.user().id)
            .single();
        if (data) {
            this.usuario = data;
        }

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