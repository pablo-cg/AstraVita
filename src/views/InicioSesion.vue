<template>
     <div class="d-flex align-items-center justify-content-center container" style="height: 800px">
        <div class="p-5 mb-4 rounded-3" style="background-color: rgba(7, 0, 44, 0.5);">
            <div class="container-fluid row">
                <div class="col-md-6">
                    <img src="@/assets/img/zodiac.jpg" th:src="@{/img/profelogo.png}" class="img-fluid">
                </div>
                <div class="col-md-6 text-light">
                    <h1 class="display-5 fw-bold text-light text-center">¡Bienvenido!</h1>
                    <form class="mt-lg-5">
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Usuario</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control rounded-pill" id="inputEmail3">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputPassword3" class="col-sm-2 col-form-label">Clave</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control rounded-pill" id="inputPassword3">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <button type="submit" class="btn d-block text-light rounded-pill"
                                style="background-color: slateblue;">Iniciar Sesión</button>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="gridCheck1">
                                    <label class="form-check-label" for="gridCheck1">
                                        Recuerdame
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 text-md-end">
                                <a href="http://" class="text-light">¿Olvidaste tu clave?</a>
                            </div>
                        </div>
                        <div class="row mb-3 text-light">
                            <div class="col">
                                ¿No posees una cuenta?, <a href="registro.html" class="text-light">Registrate</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>