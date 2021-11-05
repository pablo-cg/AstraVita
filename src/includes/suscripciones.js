let sub = null;

function setSuscripcion(suscripcion){
    sub = suscripcion;
}

function getSuscripcion(){
    return sub;
}

export default{
    sub,
    setSuscripcion,
    getSuscripcion
}
