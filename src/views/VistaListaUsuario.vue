<template>
    <div
        class="mt-4 p-5 text-white rounded"
        style="background-color: #5548a4; border-color: slateblue"
    >
        <div class="row">
            <div class="col">
                <h1>Lista de usuarios</h1>
            </div>
            <h5 class="col text-end">
                <span class="badge bg-light text-dark" v-if="usuarios">
                    Usuarios Totales: {{ usuarios.length }}
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
            <div class="table-responsive">
                <table class="table table-hover table-bordered">
                    <thead class="text-center">
                        <tr>
                            <th>UUID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Está Suscrito</th>
                            <th>Es Admin</th>
                            <th colspan="2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody v-if="usuarios" class="align-middle">
                        <tr
                            v-for="usuario in usuariosFiltrados"
                            :key="usuario.id"
                        >
                            <td class="text-center">{{ usuario.id }}</td>
                            <td>{{ usuario.nombre }}</td>
                            <td>{{ usuario.correo }}</td>
                            <td class="text-center">
                                {{ usuario.esta_suscrito ? "Si" : "No" }}
                            </td>
                            <td class="text-center">
                                {{ usuario.es_admin ? "Si" : "No" }}
                            </td>
                            <td class="text-center">
                                <button class="btn btn-primary">Editar</button>
                            </td>
                            <td class="text-center">
                                <button
                                    class="btn btn-danger"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalElimina"
                                    @click="modalEliminar(usuario)"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- MODAL ELIMINAR USUARIO -->
    <div
        class="modal fade"
        id="modalElimina"
        tabindex="-1"
        aria-labelledby="modalEliminaLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" v-if="usuarioSeleccionado">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalEliminaLabel">
                        Eliminar Usuario
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    ¿Estas seguro de eliminar a
                    {{ usuarioSeleccionado.nombre }}?
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn astra-btn-primario"
                        data-bs-dismiss="modal"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal"
                        @click="eliminarUsuario(usuarioSeleccionado.id)"
                    >
                        Eliminar usuario
                    </button>
                </div>
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
            filtro: "",
            usuarioSeleccionado: null,
            asd: null,
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
            } catch (error) {
                console.log(error);
            }
        },

        async eliminarUsuario(usuarioId) {
            try {
                const { data: eliminado, error } = await supabaseAdmin
                    .from("perfil_usuario")
                    .delete()
                    .match({ id: usuarioId });
                if (error) throw error;
                if (eliminado[0].id) {
                    const { error } = await supabaseAdmin.auth.api.deleteUser(
                        eliminado[0].id,
                        process.env.VUE_APP_ASTRAVITA_SUPABASE_SERVICE_KEY
                    );
                    if (error) throw error;
                }
                this.usuarios = this.usuarios.filter(
                    (usuario) => usuario.id != usuarioId
                );
            } catch (error) {
                console.log(error);
            }
        },

        modalEliminar(usuario) {
            this.usuarioSeleccionado = usuario;
        },
    },
    computed: {
        usuariosFiltrados() {
            return this.usuarios.filter((usuario) => {
                return usuario.nombre
                    .toLowerCase()
                    .match(this.filtro.toLowerCase());
            });
        },
    },
    async created() {
        await this.obtenerUsuarios();
    },
};
</script>