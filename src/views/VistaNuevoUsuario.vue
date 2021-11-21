<template>
    <div
        class="mt-4 p-5 text-white rounded"
        style="background-color: #5548a4; border-color: slateblue"
    >
        <div class="row">
            <div class="col text-center">
                <h1>Crear Usuario</h1>
            </div>
            <!-- <div class="col text-end"></div> -->
        </div>
    </div>
    <div class="card mt-3">
        <div class="card-body">
            <!-- CONTENIDO -->
            <div class="row">
                <div class="col-md-6">
                    <div class="card-body">
                        <form @submit.prevent="crearUsuario">
                            <!-- NOMBRE  -->
                            <div class="input-group flex-nowrap mb-3">
                                <span class="input-group-text" id="nombre"
                                    ><i class="fas fa-user"></i
                                ></span>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Nombre"
                                    aria-describedby="nombre"
                                    v-model="nombre"
                                />
                            </div>
                            <!-- CORREO -->
                            <div class="input-group flex-nowrap mb-3">
                                <span class="input-group-text" id="correo"
                                    ><i class="fas fa-at"></i
                                ></span>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Correo Electrónico"
                                    aria-describedby="correo"
                                    v-model="correo"
                                />
                            </div>
                            <!-- REGION -->
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="region"
                                    >Región</label
                                >
                                <select
                                    class="form-select"
                                    id="region"
                                    v-model="regionSeleccionada"
                                >
                                    <option
                                        v-for="region in localidades"
                                        :key="region.nombre"
                                        :value="region"
                                    >
                                        {{ region.nombre }}
                                    </option>
                                </select>
                            </div>
                            <!-- CIUDAD -->
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="ciudad"
                                    >Ciudad</label
                                >
                                <select
                                    class="form-select"
                                    id="ciudad"
                                    v-model="ciudadSeleccionada"
                                >
                                    <option
                                        v-for="ciudad in regionSeleccionada.ciudades"
                                        :key="ciudad.id"
                                        :value="ciudad"
                                    >
                                        {{ ciudad.nombre }}
                                    </option>
                                </select>
                            </div>
                            <!-- FECHA Y HORA NACIMIENTO -->
                            <div class="mb-3 row">
                                <div class="col">
                                    <label
                                        for="fechaNac"
                                        class="input-group-text"
                                        ><i class="fas fa-calendar-alt"></i
                                        >&nbsp;Fecha de Nacimiento</label
                                    >
                                    <input
                                        type="date"
                                        name="fechaNac"
                                        class="form-control"
                                        v-model="fechaNac"
                                    />
                                </div>
                                <div class="col">
                                    <label
                                        for="horaNac"
                                        class="input-group-text"
                                        ><i class="fas fa-clock"></i>&nbsp;Hora
                                        de Nacimiento</label
                                    >
                                    <input
                                        type="time"
                                        name="horaNac"
                                        class="form-control"
                                        v-model="horaNac"
                                    />
                                </div>
                            </div>
                            <!-- CONTRASEÑA -->
                            <div class="input-group flex-nowrap mb-3">
                                <span class="input-group-text" id="contrasena"
                                    ><i class="fas fa-key"></i
                                ></span>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Contraseña"
                                    aria-describedby="contrasena"
                                    v-model="contrasena"
                                />
                            </div>
                            <!-- REPETIR CONTRASEÑA -->
                            <div class="input-group flex-nowrap mb-3">
                                <span
                                    class="input-group-text"
                                    id="repetirContrasena"
                                    ><i class="fas fa-lock"></i
                                ></span>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Repite Contraseña"
                                    aria-describedby="repetirContrasena"
                                    v-model="repetirContrasena"
                                />
                            </div>
                            <!-- ROL USUARIO -->
                            <div class="input-group mb-3">
                                <label class="input-group-text" for="rolUsuario"
                                    >Tipo Usuario</label
                                >
                                <select
                                    class="form-select"
                                    id="rolUsuario"
                                    v-model="rol"
                                >
                                    <option value="usuario">Usuario</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                            <!-- SUBMIT -->
                            <button
                                type="submit"
                                class="btn astra-btn-primario"
                            >
                                Crear Usuario
                            </button>
                        </form>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <div class="card">
                            <div class="card-header text-center fw-bold">
                                Resumen
                            </div>
                            <div class="card-body">
                                <div
                                    class="
                                        list-group-item
                                        d-flex
                                        justify-content-between
                                        align-items-start
                                    "
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">Nombre</div>
                                        {{ nombre }}
                                    </div>
                                </div>
                                <div
                                    class="
                                        list-group-item
                                        d-flex
                                        justify-content-between
                                        align-items-start
                                    "
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">
                                            Correo Electrónico
                                        </div>
                                        {{ correo }}
                                    </div>
                                </div>
                                <div
                                    class="
                                        list-group-item
                                        d-flex
                                        justify-content-between
                                        align-items-start
                                    "
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">
                                            Región de Nacimiento
                                        </div>
                                        {{ regionSeleccionada.nombre }}
                                    </div>
                                </div>
                                <div
                                    class="
                                        list-group-item
                                        d-flex
                                        justify-content-between
                                        align-items-start
                                    "
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">
                                            Ciudad de Nacimiento
                                        </div>
                                        {{ ciudadSeleccionada.nombre }}
                                    </div>
                                </div>
                                <div
                                    class="
                                        list-group-item
                                        d-flex
                                        justify-content-between
                                        align-items-start
                                    "
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">
                                            Fecha de Nacimiento
                                        </div>
                                        {{ fechaNac }}
                                    </div>
                                </div>
                                <div
                                    class="
                                        list-group-item
                                        d-flex
                                        justify-content-between
                                        align-items-start
                                    "
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">
                                            Hora de Nacimiento
                                        </div>
                                        {{ horaNac }}
                                    </div>
                                </div>
                                <div
                                    class="
                                        list-group-item
                                        d-flex
                                        justify-content-between
                                        align-items-start
                                    "
                                >
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">
                                            Tipo de Usuario
                                        </div>
                                        {{
                                            rol == "usuario"
                                                ? "Usuario"
                                                : "Administrador"
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ALERTA -->
            <div
                class="alert alert-dismissible fade show"
                :class="tipoAlerta"
                role="alert"
                v-if="mensajeAlerta"
            >
                <strong>{{ mensajeAlerta.titulo }}</strong>
                {{ mensajeAlerta.mensaje }}: <br> {{ mensajeAlerta.linkActivacion }}
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>
        </div>
    </div>
</template>
<script>
import { supabaseAdmin } from "@/includes/supabaseAdmin";
import Localidades from "../assets/localidades/ciudades.json";

export default {
    data() {
        return {
            nombre: null,
            correo: null,
            contrasena: null,
            repetirContrasena: null,
            regionSeleccionada: [],
            ciudadSeleccionada: [],
            fechaNac: null,
            horaNac: null,
            rol: "usuario",
            localidades: Localidades,
            mensajeAlerta: null,
            tipoAlerta: "alert-success",
        };
    },
    computed: {
        rolUsuario() {
            return this.rol == "usuario" ? "authenticated" : "service_role";
        },
    },
    methods: {
        async crearUsuario() {
            if (this.contrasena == this.repetirContrasena) {
                try {
                    const { data: usuarioCreado, error: errorCreateUser } =
                        await supabaseAdmin.auth.api.createUser({
                            email: this.correo,
                            password: this.contrasena,
                            role: this.rolUsuario,
                        });
                    if (errorCreateUser) throw errorCreateUser;
                    const { error: errorInsertPerfil } = await supabaseAdmin
                        .from("perfil_usuario")
                        .insert({
                            id: usuarioCreado.id,
                            nombre: this.nombre,
                            correo: this.correo,
                            lugar_nac: `${this.ciudadSeleccionada.nombre}, ${this.regionSeleccionada.nombre}`,
                            id_lugar_nac: this.ciudadSeleccionada.id,
                            fecha_nac: this.fechaNac,
                            hora_nac: this.horaNac,
                            esta_suscrito: false,
                            es_admin: this.rolUsuario == 'authenticated' ? false : true
                        });
                    if (errorInsertPerfil) throw errorInsertPerfil;
                    const { data } = await supabaseAdmin.auth.api.generateLink(
                        "signup",
                        this.correo,
                        {
                            redirectTo: "http://localhost:8080/login",
                        }
                    );
                    if (data) {
                        this.tipoAlerta = "alert-success";
                        this.mensajeAlerta = {
                            titulo: "Has creado un nuevo Usuario",
                            mensaje:
                                "envía este enlace para que tu nuevo usuario active su cuenta",
                            linkActivacion: data.action_link,
                        };
                        this.limpiarFormulario();
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                this.tipoAlerta = "alert-warning";
                this.mensajeAlerta = {
                    titulo: "Ups!",
                    mensaje: "Las contraseñas no coinciden",
                };
            }
        },

        limpiarFormulario() {
            this.nombre = null;
            this.correo = null;
            this.contrasena = null;
            this.repetirContrasena = null;
            this.regionSeleccionada = [];
            this.ciudadSeleccionada = [];
            this.fechaNac = null;
            this.horaNac = null;
            this.rol = "usuario";
        },
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