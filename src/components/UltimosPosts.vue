<template>
    <div class="card mb-3">
        <div class="card-header text-light astracolor">
            <h5>Publicaciones de tus amigos</h5>
            <p class="card-text">
                <small class="text-light"
                    >Conoce lo que piensan tus cercanos</small
                >
            </p>
        </div>
        <div class="card-body">
            <div
                id="carouselExampleControls"
                class="carousel carousel-dark slide"
                data-bs-ride="carousel"
            >
                <div class="carousel-inner">
                    <div
                        class="carousel-item"
                        v-for="(post, index) in posts"
                        :key="index"
                        :class="index == 0 ? 'active' : ''"
                    >
                        <section v-if="usuario_premium">
                            <div
                                class="card mb-3"
                                style="max-width: 85%; margin: auto"
                            >
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img
                                            :src="post.avatar"
                                            class="img-fluid rounded-start"
                                            :alt="alt(post.nombre_usuario)"
                                        />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">
                                                {{ post.nombre_usuario }}
                                            </h5>

                                            <p class="card-text">
                                                <small
                                                    class="
                                                        text-muted
                                                        fst-italic
                                                    "
                                                    >{{
                                                        post.nombre_grupo
                                                    }}</small
                                                >
                                            </p>

                                            <p class="card-text">
                                                {{ post.contenido }}
                                            </p>
                                            <p class="card-text">
                                                <small
                                                    class="
                                                        text-muted
                                                        fst-italic
                                                    "
                                                    >{{
                                                        creadoEl(
                                                            post.publicado_en
                                                        )
                                                    }}</small
                                                >
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section v-else>
                            <div
                            class="card mb-3"
                            style="max-width: 85%; margin: auto"
                            v-if="!post.es_premium"
                        >
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img
                                        :src="post.avatar"
                                        class="img-fluid rounded-start"
                                        :alt="alt(post.nombre_usuario)"
                                    />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">
                                            {{ post.nombre_usuario }}
                                        </h5>

                                        <p class="card-text">
                                            <small
                                                class="text-muted fst-italic"
                                                >{{ post.nombre_grupo }}</small
                                            >
                                        </p>

                                        <p class="card-text">
                                            {{ post.contenido }}
                                        </p>
                                        <p class="card-text">
                                            <small
                                                class="text-muted fst-italic"
                                                >{{
                                                    creadoEl(post.publicado_en)
                                                }}</small
                                            >
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </section>
                    </div>
                </div>
                <button
                    class="carousel-control-prev justify-content-start"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                >
                    <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button
                    class="carousel-control-next justify-content-end"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                >
                    <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["posts", "usuario_premium"],
    methods: {
        creadoEl(fecha) {
            const nuevaFecha = new Date(fecha);
            return nuevaFecha.toLocaleString();
        },
        alt(texto) {
            const alt = texto.toLowerCase().replace(" ", "");
            return `${alt}_avatar`;
        },
    },
};
</script>
<style scoped>
.astracolor {
    background-color: slateblue;
}
</style>