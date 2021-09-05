<template>
    <div class="container rounded-3" style="background-color: rgba(7, 0, 44, 0.5)">
        <div class="conatainer-fluid row" >
            <div class="col-md-6">
                <img
                        src="@/assets/img/zodiac.jpg"
                        th:src="@{/img/profelogo.png}"
                        class="img-fluid rounded-3 mt-3"
                    />
                    <p class="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quos eos laboriosam sequi reiciendis repudiandae iste provident, nisi itaque atque accusamus ex. Voluptas libero incidunt praesentium porro, sapiente in pariatur!</p>
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