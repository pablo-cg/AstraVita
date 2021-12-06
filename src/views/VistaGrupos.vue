<template>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div class="col" v-for="data in grupos" :key="data.grupo.id">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h3 class="card-title">
                                {{ data.grupo.nombre }}
                                <router-link
                                    :to="{ name: 'Suscripcion' }"
                                    class="btn badge btn-secondary"
                                    v-if="data.grupo.de_pago"
                                    >Premium</router-link
                                >
                                <span class="badge bg-secondary" v-else
                                    >Premium</span
                                >
                            </h3>
                        </div>
                        <div class="col-4 text-end">
                            <router-link
                                class="btn astra-btn-primario"
                                :class="{ disabled: data.grupo.de_pago }"
                                :to="{
                                    name: 'Grupo',
                                    params: { id: data.grupo.id },
                                }"
                                ><i class="fas fa-long-arrow-alt-right"></i>
                                Entrar</router-link
                            >
                        </div>
                    </div>
                    <div class="card-text mt-3 mb-3">
                        <section
                            v-html="textoPlaneta[data.grupo.id_planeta]"
                        ></section>
                    </div>
                    <div class="card-text">
                        <p>
                            <button
                                class="btn astra-btn-primario"
                                type="button"
                                data-bs-toggle="collapse"
                                :data-bs-target="'#collapse' + data.grupo.id"
                                aria-expanded="false"
                                :aria-controls="'collapse' + data.grupo.id"
                            >
                                <i class="fas fa-info-circle"></i> Ver más
                                detalles de {{ data.grupo.nombre }}
                            </button>
                        </p>
                        <div class="collapse" :id="'collapse' + data.grupo.id">
                            <div class="card card-body">
                                <section
                                    v-html="data.grupo.descripcion"
                                ></section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import textoPlaneta from "../assets/planetas/textoPlaneta.json";

export default {
    data() {
        return {
            textoPlaneta,
        };
    },
    computed: {
        ...mapState("cartaAstralStore", ["cartaAstral", "grupos"]),
        ...mapState("usuarioStore", ["usuario"]),
    },
};
</script>

<style scoped>
.astra-btn-primario {
    background-color: slateblue;
    border-color: slateblue;
    color: whitesmoke;
}

.astra-btn-primario:hover {
    background-color: whitesmoke;
    border-color: slateblue;
    color: black;
}

.astra-btn-secundario {
    background-color: whitesmoke;
    border-color: slateblue;
    color: black;
}
.astra-btn-secundario:hover {
    background-color: slateblue;
    border-color: slateblue;
    color: whitesmoke;
}
</style>