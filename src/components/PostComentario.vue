<template>
    <div class="card">
        <h5 class="card-header">
            <section class="row">
                <div class="col" v-if="comentario.es_anonimo">
                    <i class="fas fa-user-secret"></i> Anónimo
                    {{ comentario.id_usuario.substring(0, 7) }} dice:
                </div>
                <div class="col" v-else>
                    <i class="fas fa-user"></i>
                    {{ comentario.nombre_usuario }} dice:
                </div>
                <div class="col text-end">
                    <i class="fas fa-clock"></i>
                    {{ creadoEl(new Date(comentario.created_at)) }}
                </div>
            </section>
        </h5>
        <div class="card-body">
            <p>{{ comentario.contenido }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["comentario"],
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