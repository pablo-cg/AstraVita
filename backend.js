const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.post('/api/suscribir/', async (request, response) => {
    const nombre = request.body.nombre;
    const correo = request.body.correo;
    const key = request.body.key;
    const url = request.body.url;

    let respuesta = null;

    let headersList = {
        "Reveniu-Secret-Key": key,
        "Content-Type": "application/json"
    }

    let reqOptions = {
        url: url,
        method: "POST",
        headers: headersList,
        data: '{\n    "plan_id":"580",\n    "field_values":{\n        "email": "' + correo + '",\n        "name": "' + nombre + '"\n    }\n}',
    }

    await axios.request(reqOptions).then(function (response) {
        respuesta = response.data;
    })

    if (respuesta) {
        response.status(200).send(respuesta);
    } else {
        response.status(418).send({
            mensaje: "Error inesperado"
        });
    }

});

//TODO: ENDPOINT PARA RECIBIR EL WEBHOOK

app.listen(
    PORT,
    () => { console.log(`Backend corriendo en puerto ${PORT}`); }
)