<template>
    <formulario-principal>
        <formulario-inicio-sesion></formulario-inicio-sesion>
    </formulario-principal>
</template>

<script>
import FormularioInicioSesion from "../components/FormularioInicioSesion.vue";
import FormularioPrincipal from "../components/FormularioPrincipal.vue";
export default {
    components: { FormularioPrincipal, FormularioInicioSesion },
};
</script>

<style>
</style>