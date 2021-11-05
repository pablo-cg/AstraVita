<template>
    <div class="card" v-if="usuario">
        <h5 class="card-header text-light" style="background-color: slateblue">
            {{ usuario.nombre }}
        </h5>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <img
                        :src="usuario.avatar_url"
                        alt="avatar_usuario"
                        class="img-fluid"
                    />
                </div>
                <div class="col-md-8">
                    <div class="mb-3">
                        <p class="card-text mb-3 text-muted">
                            {{ usuario.bio }}
                        </p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                {{ usuario.lugar_nac }}
                            </li>
                            <!-- <li class="list-group-item">
                                {{ fechaNac }} a las
                                {{ horaNac }}
                            </li>
                            <li class="list-group-item">
                                {{ usuario.correo }}
                            </li> -->
                        </ul>
                    </div>
                    <button
                        type="button"
                        class="btn astra-btn-primario m-1"
                        @click="enviarSolicitudAmistad"
                    >
                        Agregar Amigo
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { supabase } from "@/includes/supabase";
export default {
    data() {
        return {
            usuario: null,
        };
    },
    computed: {
        fechaNac() {
            return new Date(this.usuario.fecha_nac).toLocaleDateString();
        },

        horaNac() {
            return this.usuario.hora_nac.slice(0, -3);
        },
    },
    methods: {
        async buscarUsuario() {
            try {
                const { data: user, error } = await supabase
                    .from("perfil_usuario")
                    .select()
                    .eq("id", this.$route.params.idUsuario)
                    .single();
                if (error) throw error;
                this.usuario = user;
            } catch (error) {
                console.log(error);
            }
        },
        async enviarSolicitudAmistad() {
            try {
                const { error } = await supabase.from("lista_amigo").insert([
                    {
                        id_usuario1: supabase.auth.user().id,
                        id_usuario2: this.usuario.id,
                    },
                ]);
                if (error) throw error;
                console.log("solicitud enviada");
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        await this.buscarUsuario();
        const nombreUsuario = this.usuario.nombre;
        document.title = `${nombreUsuario} - AstraVita`;
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