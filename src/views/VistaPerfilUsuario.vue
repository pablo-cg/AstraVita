<template>
    <div>
        <div class="mb-2">
            <PerfilUsuarioCabecera/>
        </div>
        <div>
            <PerfilUsuarioCuerpo/>
        </div>
    </div>
</template>

<script>
import PerfilUsuarioCabecera from "../components/PerfilUsuarioCabecera.vue";
import PerfilUsuarioCuerpo from "../components/PerfilUsuarioCuerpo.vue";

export default {
    components: {
        PerfilUsuarioCabecera,
        PerfilUsuarioCuerpo,
    },
};
</script>