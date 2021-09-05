<template>
     <div class="d-flex align-items-center justify-content-center container" style="height: 800px">
            <div class="p-5 mb-4 rounded-3" style="background-color: rgba(7, 0, 44, 0.5);">
                <div class="container-fluid row">
                    <div class="col-md-6">
                        <img src="@/assets/img/astraLogoSloganBlanco.png" th:src="@{/img/profelogo.png}"
                             class="img-fluid">
                    </div>
                    <div class="col-md-6">
                        <h1 class="display-5 fw-bold text-light">Hola! <i class="fas fa-smile-beam"></i><i class="fas fa-hand-peace"></i></h1>
                        <p class="fs-5 text-light">AstraVita es una plataforma de ayuda enfocada en el cuidado personal, el autodescubrimiento y la orientación vocacional, utilizando como metodología la interpretación de la carta astral y la empatía de los usuarios a través del intercambio de experiencias.</p>
                        <router-link to="/registro" class="btn btn-lg text-light" style="background-color: slateblue;" type="button">Registrate aquí! <i class="fas fa-sun"></i></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Home",
    components: {},
};
</script>
