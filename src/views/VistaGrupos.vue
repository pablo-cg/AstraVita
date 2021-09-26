<template>
    <div class="row">
        <!-- <div class="col-md-4 mb-1" v-for="grupo in grupos" :key="grupo">
            <div class="card">
                <img
                    class="card-img-top"
                    src="../assets/img/demoChart.svg"
                    :alt="grupo.nombre"
                    style="filter: blur(4px)"
                />
                <div class="card-img-overlay">
                    <h4 class="card-title">{{ grupo.nombre }}</h4>
                    <div class="card-body">
                        <h5>Objetivo: {{ grupo.objetivos }}</h5>
                        <h5>Ego: {{ grupo.ego }}</h5>
                        <h5>Personalidad: {{ grupo.personalidad }}</h5>
                    </div>
                    <div class="card-footer">
                        <router-link class="btn btn-primary" to="/inicio"
                            >Entrar</router-link
                        >
                    </div>
                </div>
            </div>
        </div> -->
        <div class="card" v-for="grupo in grupos" :key="grupo">
            <img
                class="card-img-top"
                src="../assets/img/demoChart.svg"
                :alt="grupo.nombre"
                style="filter: blur(4px)"
            />
            <div class="card-img-overlay">
                <h4 class="card-title">{{ grupo.nombre }}</h4>
                <div class="card-body">
                    <div v-html="grupo.descripcion"></div>
                </div>
                <div class="card-footer">
                    <router-link class="btn btn-primary" to="/inicio"
                        >Entrar</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { supabase } from "../includes/supabase";

export default {
    data() {
        return {
            grupos: null,
        };
    },
    async created() {
        try {
            const { data: grupos, error } = await supabase
                .from("grupo")
                .select("*");
            if (grupos) {
                this.grupos = grupos;
            }

            if (error) throw error;
        } catch (error) {
            console.log(error);
        }
    },
};
</script>