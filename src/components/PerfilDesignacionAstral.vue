<template>
    <div class="col-md-4">
        <h5 class="text-center" @click="test">Tu Carta Astral</h5>
        <!-- <img :src="imagenRuedaCarta" alt="carta_astral" class="img-fluid" /> -->
    </div>
    <div class="col-md-8">
        <h5 class="text-center">Designación Astral</h5>
        <div class="row">
            <div class="col-md-6">
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th colspan="5" class="text-center">
                                Zodiaco: Tropical
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="planeta in planetas" :key="planeta">
                            <th>
                                <i
                                    class="ai"
                                    :class="normalizar(planeta.planetName)"
                                />
                            </th>
                            <td>{{ planeta.planetName }}</td>
                            <th>
                                <i
                                    class="ai"
                                    :class="normalizar(planeta.signName)"
                                />
                            </th>
                            <td>{{ planeta.signName }}</td>
                            <td class="text-center">
                                {{ planeta.degrees }}&#176;
                                {{ planeta.minutes }}'
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th colspan="4" class="text-center">
                                Placidus Orb: 0
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="casa in casas" :key="casa">
                            <td>{{ casa.houseName }}</td>
                            <td>
                                <i
                                    class="ai"
                                    :class="normalizar(casa.signName)"
                                />
                            </td>
                            <td>{{ casa.signName }}</td>
                            <td class="text-center">
                                {{ casa.degrees }}&#176; {{ casa.minutes }}'
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-center">
                                *Asc: Ascendente
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-center">
                                *MC: Medio Cielo
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { supabase } from "../includes/supabase";

export default {
    props: ["planetas", "casas", "imagenRuedaCarta"],
    methods: {
        normalizar(texto) {
            const normal = texto
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            return normal.replace(" ", "");
        },
        async test() {
            const opcionesRequest = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            };
            
            const img = await fetch("https://v70ppwoy52.execute-api.eu-west-1.amazonaws.com/stage/chart?payload=NYA4Jx8Cpeqom%2FDtMO0EKfEkAtojPVO3C3hsWZc%2FbWi3erm0uQav9o0kM8eGqpbVQ1MxzfpwNq%2F6XlcECKz9bPz9CCqKymnWSM9%2FKMJzD2josehq7kg4Vpc7Er%2FyhRoeEdLm2zEAgsdMIuC03L0C91WFksp6R2L8oLnTu1Z8c8XJqWbsX2%2FnGeVovsEccBlMrwGVn1C2SETwJ4%2BBX9pjrFMPTAw8m5SfqM2yA71hv0o%2FE7TAjVjjnK3tCxpGZwCsiwJwI5aPnmcMVsLrGAUyTqOP6gKjxCYU3ZnYEgIYO2LGDKgFrBfF3ljRvrmhEEcHawVqspg8QoL2Dm5S0MX9Yi637S12RFyfNsHz%2B7fepsXe8ETtjj4CYQC8jV9taEKqN9ygn2a1YTWCD%2BgcLkTTP3knqXSrq3l2zFxKM2B0nF1zV5vFg3tEg9bdxplxeoZMMK2Y53MzrdWfHqgLH%2FCOQN7WY0O5fit33tM2po%2F1bivaPFzNgFGxgVMeegEB79%2B1%2FpDlc1SnTnS1nzsirYWI4LIQ61eWvxfLhi6IA1SAoqWGCTpHeNGeUa3hHspaDat9DtZ4xuPqajElkVA3ZPzlRp4pslXdq%2B7sL2T0wOd1vDUctbFJJ89lt4G4D1RPYiuhLidAtlW1V4tCayT61EWGQl0xbdNQdBDE7VTG5b%2BuS%2FJcWo9I9gnrsEPyKrzdGmoeUya%2FdRTBgg8POJqMmEOJjeZNiGX5XLL%2FjY18bQTLhzCihxaBravLQkIl%2FnIqbaV7Zs3qSa1iWspAdmwCLzHmzSF1jc5P8XEXslLsnzP8RPApfGyjV3Eu3jp9oGEL70mq2sW09aDSR5NVvkFWc0Osc2QogDzfyRYh94eVq47KWF3lAGm9tVh3%2Be%2FkkpXaZs12Leg69Tc3TxYq%2BbB1oa%2FDvQrXmqENUdK9J%2BVKhpRRK0FYRirtU45GBuRBqAScEZ%2B0gzZFpXZUPg106I00Tg4KLlStJ9X6xpkBToDuVJusFbp0TwZjmh7rZ%2B5IXBo1YmrJ2V%2BxDUE4Qp%2BcEPPqWfeDu8vvM1ZDYz2HZY4QTqUL33KSJ5EIkRHtw%2F5PFFcwl0XKFAPeITTxoblAoVHmvIZMJPeSW12n8vFpjpTdobnqhAclniMkMPQXWFVKZaQ%2Fu67UER%2FaHEW1FQl2qpAEzruJ369TeYRCntRLN3FF9w2eqkIJKb4rIMMgEImdpaN885l7adDNHDRYDph4KsEdPSvXegQaJLDUBCQC0IGcvYNVR3usqhtPs4iAtBZMSKxNhrnOAGEk22OjL06%2FEOqOgSgAhWr2CD3E1l760Ib%2FkdZEE0Kvl8c%2FQclCYHmJq4Bc%2BLfDP68prMwODlXVLamvOuIxDb%2F6%2B%2Bpi4uZ0XvT4Oqk388fur%2FA3y7F0WKqyzF9PNx5pohtDwI1MjpxPveG0z64PM%2BHFNKTJesSbidRg4y80ii8VArDnW5MKLRhkLHcBhWyo07uF1RzTU1e%2B7LG1F7CrTPJFuoC7nHb5OeS8IeyQKYmX1p1VTaQRQUzHT9%2BWLmxUMBIBjKnm%2Ff5buHfvdxfkWCM6Pieb6iKoy%2BOF5%2BRzeD07OACH6se48v%2BhZcHv&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhc3Ryb2FwaSIsImlhdCI6MTYzMjAyMjQyMiwiZXhwIjoxNjMyMDIyNzIyfQ.FtOnzrYAhKz68kuUjBOYZd08hCoi3oMn-v445yoByds", opcionesRequest);
            // const imgblob = await img.blob();
            // console.log(imgblob);

            // const { data, error } = await supabase.storage
            //     .from("astra_bucket")
            //     .upload("wheels/avatar2.svg", imgblob);

            // if(error){
            //     console.log(error);
            // }else{
            //     console.log(data);
            // }

            // const { data, error } = supabase.storage
            //     .from("public_bucket")
            //     .download("wheels/avatar1.jpeg");

            // if (error) {
            //     console.log(error);
            // } else {
            //     console.log(data);
            // }
        },
    },
};
</script>

<style scoped>
@import "../assets/css/zodiac.css";
</style>

