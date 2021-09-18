<template>
    <div class="card">
        <h5
            class="card-header text-light text-center"
            style="background-color: slateblue"
            @click="logDatos()"
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
                        <hr />
                        {{ planet.speeds }}
                    </div>
                </section>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <h5>Tu Carta Astral</h5>
                    <img :src="cartaAstral.wheel" alt="carta_astral">
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
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="calcularCartaAstral"
                    >
                        Aquí
                    </button>
                </h5>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["cartaAstral"],
    computed: {
        ...mapState(["usuario"]),
    },
    methods: {
        async calcularCartaAstral() {
            const opcionesRequest = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer 306590|PHgyIPNB3X8hDhAazQbfX4M6rznQSY6MXDKz3F4v",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    name: this.usuario.nombre,
                    date: this.usuario.fecha_nac,
                    time: this.usuario.hora_nac.slice(0, -3),
                    place_id: this.usuario.id_lugar_nac,
                    lang: "en",
                    system: "p",
                }),
            };

            const datos = await fetch(
                "https://api.bloom.be/api/natal",
                opcionesRequest
            ).then((response) => response.json());

            const { profile, planets, elements } = datos;

            console.log(profile);
            console.log(elements);
            console.log(planets);
        },
    },
};
</script>

<style>
</style>