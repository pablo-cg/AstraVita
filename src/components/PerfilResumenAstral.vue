<template>
    <div class="card">
        <h5
            class="card-header text-light text-center"
            style="background-color: slateblue"
        >
            Tu Resumen Astral
        </h5>
        <div class="card-body" v-if="cartaAstral">
            <div class="row">
                <h1>{{ cartaAstral.profile.name }}</h1>
                <section>
                    <div v-for="planet of cartaAstral.planets" :key="planet">
                        <div
                            v-for="housetext in planet.housetext"
                            :key="housetext"
                        >
                            {{ housetext }}
                        </div>
                    </div>
                </section>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <h5>Tu Carta Astral</h5>
                    <p>ACA VA LA IMAGEN</p>
                </div>
                <div class="col-md-6">
                    <h5>Designación Astral</h5>
                    <p>ACA VA LA TABLITA</p>
                </div>
            </div>
        </div>
        <div class="card-body" v-else>
            <div class="row">
                <h5 class="text-center">
                    Tu carta astral aun no ha sido calculada, si quieres
                    calcularla presiona
                    <button type="button" class="btn btn-primary">Aquí</button>
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["cartaAstral"],
    data() {
        return {};
    },
};
</script>

<style>
</style>