<template>
    <div>
        <div class="mb-2">
            <PerfilUsuarioCabecera />
        </div>
        <div>
            <PerfilUsuarioCuerpo />
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
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        },
    },
    beforeMount() {
        if (this.$route.params.id == "#") {
            this.scrollToTop();
        }
    },
};
</script>