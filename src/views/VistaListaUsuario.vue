<template>
    <div
        class="mt-4 p-5 text-white rounded"
        style="background-color: #5548a4; border-color: slateblue"
    >
        <div class="row">
            <div class="col">
                <h1>Usuarios</h1>
            </div>
        </div>
        <div class="row mt-4" v-if="usuarios">
            <h5 class="col">
                <span class="badge bg-light text-dark"
                    >Usuarios Totales: {{ usuarios.length }}</span
                >
            </h5>
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-hover table-bordered">
                    <thead class="text-center">
                        <tr>
                            <th scope="col">UUID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Estado Suscripción</th>
                            <th scope="col" colspan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody v-if="usuarios" class="align-middle">
                        <tr v-for="usuario in usuarios" :key="usuario.id">
                            <td>{{ usuario.id }}</td>
                            <td>{{ usuario.nombre }}</td>
                            <td>{{ usuario.correo }}</td>
                            <td class="text-center">
                                {{ usuario.esta_suscrito }}
                            </td>
                            <td class="text-center">
                                <button class="btn btn-primary">Editar</button>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import { supabaseAdmin } from "@/includes/supabaseAdmin";
export default {
    data() {
        return {
            usuarios: null,
        };
    },
    methods: {
        async obtenerUsuarios() {
            try {
                const { data, error } = await supabaseAdmin
                    .from("perfil_usuario")
                    .select();
                if (error) throw error;
                this.usuarios = data;
                console.log(this.usuarios);
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        await this.obtenerUsuarios();
    },
};
</script>