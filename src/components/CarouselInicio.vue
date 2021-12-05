<template>
    <div
        id="carouselExampleCaptions"
        class="carousel slide mb-3"
        data-bs-ride="carousel"
    >
        <div class="carousel-indicators">
            <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
            ></button>
            <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
            ></button>
            <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
            ></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img
                    src="@/assets/img/carouselTierra.png"
                    class="d-block w-100"
                    alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                    <h1>Bienvenido {{ nombreUsuario }}</h1>
                    <p></p>
                </div>
            </div>
            <div class="carousel-item">
                <img
                    src="@/assets/img/carouselAcompana.jpg"
                    class="d-block w-100"
                    alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                    <h1>Del Universo a tu Persona</h1>
                    <p></p>
                </div>
            </div>
            <div class="carousel-item">
                <img
                    src="@/assets/img/carouselZodiac2.jpg"
                    class="d-block w-100"
                    alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                    <h1>AstraVita te acompaña</h1>
                    <p></p>
                </div>
            </div>
        </div>
        <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
<script>
export default {
    props: ["nombreUsuario"],
};
</script>