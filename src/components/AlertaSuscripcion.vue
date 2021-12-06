<template>
    <div
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
        v-if="status == 202"
    >
        <strong
            ><i class="fas fa-exclamation-circle"></i> Ups Algo salió
            mal!</strong
        >
        Hubo un error al procesar tu pago, intenta nuevamente más tarde
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
    </div>
    <div
        class="alert alert-success alert-dismissible fade show"
        role="alert"
        v-if="status == 402"
    >
        <strong
            ><i class="fas fa-smile-beam"></i> Felicidades!</strong
        >
        El proceso de pago terminó de manera exitosa, tu suscripción se activará en el transcurso de unos minutos.
        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
        ></button>
    </div>
</template>
<script>
export default {
    props:['status']
}
</script>