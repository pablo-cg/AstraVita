<template>
    <div
        class="mt-4 p-5 text-white rounded"
        style="background-color: #5548a4; border-color: slateblue"
    >
        <div class="row">
            <div class="col">
                <h1>Tickets de Soporte</h1>
            </div>
            <h5 class="col text-end" v-if="casos">
                <span class="badge bg-light text-dark m-1">
                    Casos: {{ casos.length }}
                </span>
                <span class="badge bg-light text-dark">
                    Sin respuesta: {{ casosSinRespuesta.length }}
                </span>
            </h5>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <div class="input-group my-2">
                <span class="input-group-text">Filtrar</span>
                <input
                    type="text"
                    class="form-control border-dark"
                    placeholder="Ingresa un nombre"
                    v-model="filtro"
                />
            </div>
            <div class="">
                <table class="table table-hover table-bordered">
                    <thead class="text-center">
                        <tr>
                            <th>Nombre Usuario</th>
                            <th>Enviado el</th>
                            <th>Asunto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody v-if="casos">
                        <tr v-for="caso in casosFiltrados" :key="caso.id">
                            <td >{{caso.perfil_usuario.nombre}}</td>
                            <td class="text-center">{{creadoEl(caso.created_at)}}</td>
                            <td class="text-center"> {{caso.asunto}}</td>
                            <td class="text-center">
                                 <button
                                    class="btn btn-primary"
                                >
                                    Responder
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { supabase } from "@/includes/supabase";
export default {
    data() {
        return {
            casos: null,
            filtro: "",
        };
    },
    computed: {
        casosFiltrados() {
            return this.casos.filter((caso) => {
                return caso.perfil_usuario.nombre
                    .toLowerCase()
                    .match(this.filtro.toLowerCase());
            });
        },

        casosSinRespuesta() {
            return this.casos.filter((caso) => {
                return caso.respuesta == null;
            });
        },
    },
    methods: {
        async obtenerCasos() {
            try {
                const { data: caso_soporte, error } = await supabase
                    .from("caso_soporte")
                    .select("*, perfil_usuario (nombre)");
                if (error) throw error;
                this.casos = caso_soporte;
            } catch (error) {
                console.log(error);
            }
        },

        creadoEl(fecha) {
            const nuevaFecha = new Date(fecha)
            const fechaFormateada = nuevaFecha.toLocaleString();
            return fechaFormateada;
        },
    },

    async created(){
        await this.obtenerCasos();
    }

};
</script>