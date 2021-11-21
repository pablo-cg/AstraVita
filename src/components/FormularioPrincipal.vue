<template>
    <div class="container rounded-3" style="background-color: rgba(7, 0, 44, 0.5)">
        <div class="conatainer-fluid row" >
            <div class="col-md-6">
                <img
                        src="@/assets/img/zodiac.jpg"
                        th:src="@{/img/profelogo.png}"
                        class="img-fluid rounded-3 mt-3"
                    />
                    <p class="text-light">
                        La Astrología es una disciplina interpretativa que nos ayuda a comprender nuestros procesos.
                    </p>
                    <p class="text-light">
                        Es dentro de este marco que, una <span class="fw-bold">Carta Natal</span> o <span class="fw-bold">Carta Astral</span> despliega una capacidad simbólica y arquetípica, que orienta ciertos patrones y ciertas situaciones. Inclina, <span class="fw-bold">mas no determina.</span>
                    </p>
            </div>
            <div class="col-md-6">
                <div class="card-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>