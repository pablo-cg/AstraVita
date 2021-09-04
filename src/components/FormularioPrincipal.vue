<template>
        <div class="d-flex align-items-center justify-content-center container" style="height: 800px">
        <div class="p-5 mb-4 rounded-3" style="background-color: rgba(7, 0, 44, 0.5);">
            <div class="container-fluid row">
                <div class="col-md-6">
                    <img src="@/assets/img/zodiac.jpg" th:src="@{/img/profelogo.png}" class="img-fluid">
                </div>
            <slot></slot>
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