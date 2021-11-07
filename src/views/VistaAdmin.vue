<template>
    <h1 @click="test">ADMIN</h1>
</template>
<script>
export default {
    methods:{
        test(){
           if (this.$route.name == "Admin") {
               console.log("soy admin");
           }
        }
    }
}
</script>