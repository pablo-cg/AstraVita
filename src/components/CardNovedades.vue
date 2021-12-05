<template>
    <div class="card mb-3">
        <div class="card-header text-light astracolor" >
            <h5>Novedades</h5>
            <p class="card-text">
                <small class="text-light"
                    >Noticias y actualizaciones de plataforma, horóscopo y
                    más...</small
                >
            </p>
        </div>
        <div class="card-body">
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button
                            class="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            <div>
                                <i class="fas fa-calendar-alt"></i> 22-11-2022
                                <br />
                                Implementación de Lectura de Palma!
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            <div class="card mb-3">
                                <img
                                    src="@/assets/img/palma.jpg"
                                    class="card-img-top"
                                    alt="..."
                                />
                                <div class="card-body">
                                    <h5 class="card-title">Lectura de Palma</h5>
                                    <p class="card-text">
                                        Con el nuevo sistema de lectura de palma
                                        podrás saber más de ti de manera...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            <div>
                                <i class="fas fa-calendar-alt"></i> 21-03-2022
                                <br />
                                Lanzamiento de AstraVita a nivel mundial
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            <div class="card mb-3">
                                <img
                                    src="@/assets/img/astraMundial.jpg"
                                    class="card-img-top"
                                    alt="..."
                                />
                                <div class="card-body">
                                    <h5 class="card-title">
                                        De AstraVita para el mundo
                                    </h5>
                                    <p class="card-text">
                                        Celebramos el lanzamiento oficial de
                                        Astravita con promociones...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            <div>
                                <i class="fas fa-calendar-alt"></i> 20-12-2021
                                <br />
                                Comienza la etapa beta de AstraVita
                            </div>
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
                            <div class="card mb-3">
                                <img
                                    src="@/assets/img/beta.png"
                                    class="card-img-top"
                                    alt="..."
                                    style="max-height: 150px"
                                />
                                <div class="card-body">
                                    <h5 class="card-title">
                                        Anuncio de registro a la beta abierta de
                                        AstraVita
                                    </h5>
                                    <p class="card-text">
                                        Prueba AstraVita antes que todos con la
                                        versión BETA...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.astracolor {
    background-color: slateblue;
}
</style>