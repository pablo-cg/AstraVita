import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import usuarioStore from './modules/usuarioStore';
import cartaAstralStore from './modules/cartaAstralStore';

// Depedencia para encriptar las cookies
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

export default createStore({
    modules: {
        usuarioStore,
        cartaAstralStore
    },
    //Encriptación de las cookies en localStorage
    // plugins : [createPersistedState({
    //     storage: {
    //         getItem: (key) => ls.get(key),
    //         setItem: (key, value) => ls.set(key, value),
    //         removeItem: (key) => ls.remove(key),
    //       },
    // })],
    plugins : [createPersistedState()],
})
