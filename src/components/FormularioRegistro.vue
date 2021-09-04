<template>
    <div class="col-md-6 text-light">
        <h1 class="display-5 fw-bold text-light text-center">Registro</h1>
        <form class="mt-lg-5">
            <div class="row mb-3">
                <label for="nombre" class="col-sm-2 col-form-label"
                    >Nombre</label
                >
                <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control rounded-pill"
                        id="nombre"
                    />
                </div>
            </div>
            <div class="row mb-3">
                <label for="email" class="col-sm-2 col-form-label"
                    >Correo</label
                >
                <div class="col-sm-10">
                    <input
                        type="email"
                        class="form-control rounded-pill"
                        id="email"
                    />
                </div>
            </div>
            <div class="row mb-3">
                <label for="email" class="col-sm-2 col-form-label text-nowrap"
                    >Lugar nacimiento</label
                >
                <div class="col-sm-8 offset-sm-2">
                    <select
                        class="form-select rounded-pill"
                        aria-label="Default select example"
                    >
                        <option selected>Ciudad</option>
                        <option value="1">Ciudad 1</option>
                        <option value="2">Ciudad 2</option>
                        <option value="3">Ciudad 3</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-4 col-form-label">Hora Nacimiento</div>
                <div class="col-5">
                    <!-- <label for="nombre" class="col-sm-2 col-form-label"></label> -->
                    <!-- <div class="col-sm-10"> -->
                    <input
                        type="date"
                        class="form-control rounded-pill"
                        id="nombre"
                    />
                    <!-- </div> -->
                </div>
                <div class="col-3">
                    <!-- <label for="nombre" class="col-sm-2 col-form-label"></label> -->
                    <!-- <div class="col-sm-10"> -->
                    <input
                        type="time"
                        class="form-control rounded-pill"
                        id="nombre"
                    />
                    <!-- </div> -->
                </div>
            </div>
            <div class="row mb-3">
                <label for="contrasena" class="col-sm-2 col-form-label"
                    >Clave</label
                >
                <div class="col-sm-10">
                    <input
                        type="password"
                        class="form-control rounded-pill"
                        id="contrasena"
                    />
                </div>
            </div>
            <div class="row mb-3">
                <label for="contrasena" class="col-sm-2 col-form-label"
                    >Repetir Clave</label
                >
                <div class="col-sm-10">
                    <input
                        type="password"
                        class="form-control rounded-pill"
                        id="contrasena"
                    />
                </div>
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
export default {};
</script>

<style>
</style>