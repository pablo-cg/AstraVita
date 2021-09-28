<template>
    <div class="row row-cols-1 row-cols-md-1 g-2">
        <div class="col" v-for="grupo in grupos" :key="grupo.grupo.id">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h3 class="card-title">
                                {{ grupo.grupo.nombre }}
                                <span
                                    class="badge bg-secondary"
                                    v-if="grupo.grupo.de_pago"
                                    >Premium</span
                                >
                            </h3>
                        </div>
                        <div class="col-4 text-end">
                            <router-link
                                class="btn btn-primary"
                                :class="{ disabled: grupo.grupo.de_pago }"
                                to="/grupos"
                                >Entrar</router-link
                            >
                        </div>
                    </div>
                    <div class="card-text mt-3 mb-3">
                        <section
                            v-html="textoPlaneta[grupo.grupo.id_planeta]"
                        ></section>
                    </div>
                    <div class="card-text">
                        <p>
                            <button
                                class="btn btn-primary"
                                type="button"
                                data-bs-toggle="collapse"
                                :data-bs-target="'#collapse' + grupo.grupo.id"
                                aria-expanded="false"
                                :aria-controls="'collapse' + grupo.grupo.id"
                            >
                                Ver más detalles de {{ grupo.grupo.nombre }}
                            </button>
                        </p>
                        <div class="collapse" :id="'collapse' + grupo.grupo.id">
                            <div class="card card-body">
                                <section
                                    v-html="grupo.grupo.descripcion"
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