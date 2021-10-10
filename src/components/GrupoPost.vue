<template>
    <div class="card">
        <h5 class="card-header row">
            <div class="col" v-if="post.es_anonimo">
                <i class="fas fa-user-secret"></i> Anónimo dice:
            </div>
            <div class="col" v-else>
                <i class="fas fa-user"></i> {{ post.nombre_usuario }} dice:
            </div>
            <div class="col text-end">
                <i class="fas fa-clock"></i>
                {{ creadoEl(new Date(post.created_at)) }}
            </div>
        </h5>
        <div class="card-body">{{ post.contenido }}</div>
    </div>
</template>

<script>
export default {
    props: ["post"],
    methods: {
        creadoEl(fecha) {
            const nuevaFecha = fecha.toLocaleString();
            return nuevaFecha;
        },
    },
};
</script>

<style>
</style>