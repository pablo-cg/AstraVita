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
            usuario: { type: Object },
            cartaAstral: { type: Object },
        };
    },
    async created() {
        const { data } = await supabase
            .from("perfil_usuario")
            .select()
            .eq("id", supabase.auth.user().id)
            .single();
        this.usuario = data;

        const carta = await supabase
            .from("perfil_astral")
            .select("carta_astral")
            .eq("id_usuario", supabase.auth.user().id)
            .single();
        if (carta === null) {
            this.cartaAstral = carta.data.carta_astral;
            console.log("carta not null");
        } else {
            this.cartaAstral = null;
            console.log("carta null");
        }
    },
};
</script>