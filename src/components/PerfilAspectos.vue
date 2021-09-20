<template>
    <section>
        <div v-for="aspecto in aspectos" :key="aspecto">
            <h5>
                {{ aspecto.titulo }}
            </h5>
            <p>
                {{ aspecto.descripcion }}
            </p>
        </div>
    </section>
</template>

<script>
export default {
    props: ["aspectos"],
};
</script>

<style>
</style>