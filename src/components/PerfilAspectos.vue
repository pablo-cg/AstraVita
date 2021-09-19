<template>
    <section>
        <div v-for="aspecto in aspectos" :key="aspecto">
            <h5 v-if="aspecto.aspectName != 'Semicuadratura'">
                {{ `${aspecto.planet1Name} ${aspecto.aspectName} ${aspecto.planet2Name}` }}
            </h5>
        </div>
    </section>
</template>

<script>
export default {
    props:['aspectos']
};
</script>

<style>
</style>