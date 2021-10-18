<template>
    <div class="col-md-4">
        <h5 class="text-center" @click="test">Tu Carta Astral</h5>
        <!-- <img :src="imagenRuedaCarta" alt="carta_astral" class="img-fluid" /> -->
        <div class="card text-center">
            <img
                class="card-img-top"
                src="../assets/img/demoChart.svg"
                alt="Card image"
                style="filter:blur(4px)"
            />
            <div class="card-img-overlay">
                <h4 class="card-title">¿Quieres una imagen de tu carta astral?</h4>
                <p class="card-text">Contáctanos y podrás conseguir una totalmente personalizada</p>
                <a href="#" class="btn astra-btn-primario">Pide la tuya aquí</a>
            </div>
        </div>
    </div>
    <div class="col-md-8">
        <h5 class="text-center">Designación Astral</h5>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th colspan="5" class="text-center">
                                Zodiaco: Tropical
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="planeta in planetas" :key="planeta">
                            <th>
                                <i
                                    class="ai"
                                    :class="normalizar(planeta.planetName)"
                                />
                            </th>
                            <td>{{ planeta.planetName }}</td>
                            <th>
                                <i
                                    class="ai"
                                    :class="normalizar(planeta.signName)"
                                />
                            </th>
                            <td>{{ planeta.signName }}</td>
                            <td class="text-center">
                                {{ planeta.degrees }}&#176;
                                {{ planeta.minutes }}'
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th colspan="4" class="text-center">
                                Cúspides de las Casas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="casa in casas" :key="casa">
                            <td>{{ casa.houseName }}</td>
                            <td>
                                <i
                                    class="ai"
                                    :class="normalizar(casa.signName)"
                                />
                            </td>
                            <td>{{ casa.signName }}</td>
                            <td class="text-center">
                                {{ casa.degrees }}&#176; {{ casa.minutes }}'
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-center">
                                *Asc: Ascendente
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-center">
                                *MC: Medio Cielo
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["planetas", "casas", "imagenRuedaCarta"],
    methods: {
        normalizar(texto) {
            const normal = texto
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            return normal.replace(" ", "");
        },
        async test() {
            // const imgblob = await img.blob();
            // console.log(imgblob);
            // const { data, error } = await supabase.storage
            //     .from("astra_bucket")
            //     .upload("wheels/avatar2.svg", imgblob);
            // if(error){
            //     console.log(error);
            // }else{
            //     console.log(data);
            // }
            // const { data, error } = supabase.storage
            //     .from("public_bucket")
            //     .download("wheels/avatar1.jpeg");
            // if (error) {
            //     console.log(error);
            // } else {
            //     console.log(data);
            // }
        },
    },
};
</script>

<style scoped>
@import "../assets/css/zodiac.css";
</style>

