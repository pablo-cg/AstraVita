<template>
    <div class="col-md-6 text-light">
        <form class="mt-lg-5" @submit.prevent="RegistrarUsuario">
            <h1 class="display-6 fw-bold text-light text-center">Registro</h1>
            <div class="mb-3">
                <label for="nombre">Nombre</label>
                <input
                    type="text"
                    class="form-control rounded-pill"
                    id="nombre"
                    v-model="nombre"
                />
                <p v-if="nombreVacio" class="form-text text-center text-danger">
                    Debes ingresar un nombre
                </p>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label"
                    >Dirección de Correo Electrónico</label
                >
                <input
                    type="email"
                    class="form-control rounded-pill"
                    id="email"
                    v-model="correoElectronico"
                />
                <p
                    v-if="!correoValido"
                    class="form-text text-center text-danger"
                >
                    Debes ingresar un correo electrónico válido
                </p>
                <p v-else class="form-text text-center text-light">
                    Tu dirección de correo esta seguro con nosotros.
                </p>
            </div>
            <div class="mb-3">
                <label for="pais" class="form-label">País de Nacimiento</label>
                <select
                    class="form-select rounded-pill"
                    aria-label="pais"
                    id="pais"
                    v-model="paisSeleccionado"
                >
                    <option selected>Open this select menu</option>
                    <option
                        v-for="pais in paises"
                        :key="pais.nombre"
                        :value="pais"
                    >
                        {{ pais.nombre }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="ciudad" class="form-label">Ciudad de Nacimiento</label>
                <select
                    class="form-select rounded-pill"
                    aria-label="ciudad"
                    id="ciudad"
                    v-model="ciudadSeleccionada"
                >
                    <option selected>Open this select menu</option>
                    <option
                        v-for="ciudad in paisSeleccionado.ciudades"
                        :key="ciudad"
                        :value="ciudad"
                    >
                        {{ ciudad }}
                    </option>
                </select>
            </div>
            <div class="mb-3">
                <label for="contrasena" class="form-label">Contraseña</label>
                <input
                    type="password"
                    class="form-control rounded-pill"
                    id="contrasena"
                    v-model="contrasena"
                />
            </div>
            <div class="mb-3">
                <label for="repetirContrasena" class="form-label"
                    >Repite tu Contraseña</label
                >
                <input
                    type="password"
                    class="form-control rounded-pill"
                    id="repetirContrasena"
                    v-model="repetirContrasena"
                />
                <p
                    v-if="!coincideContrasena"
                    class="form-text text-danger text-center"
                >
                    Las contraseñas no coinciden
                </p>
            </div>
            <div class="row mb-3">
                <button
                    type="submit"
                    class="btn d-block text-light rounded-pill"
                    style="background-color: slateblue"
                >
                    Registrarse
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
    setup() {
        const paises = ref([
            {
                nombre: "Chile",
                ciudades: ["Stgo", "Valpo", "Conce"],
            },
            {
                nombre: "Argentina",
                ciudades: ["Mendoza", "BSAS", "Cordoba"],
            },
        ]);

        const nombre = ref("");
        const correoElectronico = ref("");
        const contrasena = ref("");
        const repetirContrasena = ref("");
        const paisSeleccionado = ref("");
        const ciudadSeleccionada = ref("");

        const nombreVacio = computed(() => {
            return nombre.value.trim() === "" ? true : false;
        });

        const correoValido = computed(() => {
            const regEx =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regEx.test(correoElectronico.value) ? true : false;
        });

        const coincideContrasena = computed(() => {
            if (contrasena.value !== repetirContrasena.value) {
                return false;
            } else {
                return true;
            }
        });

        // const datosCompletos = () => {
        //     if (
        //         !nombreVacio.value &&
        //         correoValido.value &&
        //         coincideContrasena.value
        //     ) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // };

        const RegistrarUsuario = () => {
            // if (datosCompletos()) {
            //     console.log(nombre.value);
            //     console.log(correoElectronico.value);
            //     console.log(contrasena.value);
            // } else {
            //     console.log("incompleto");
            // }
            console.log(paisSeleccionado.value.nombre);
            console.log(ciudadSeleccionada.value);
        };

        return {
            nombre,
            correoElectronico,
            contrasena,
            repetirContrasena,
            coincideContrasena,
            paises,
            paisSeleccionado,
            ciudadSeleccionada,
            nombreVacio,
            correoValido,
            RegistrarUsuario,
        };
    },
};
</script>

<style>
</style>