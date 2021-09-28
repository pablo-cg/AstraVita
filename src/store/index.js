import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
import usuarioStore from './modules/usuarioStore';
import cartaAstralStore from './modules/cartaAstralStore';

// var ls = new SecureLS({ isCompression: false });

export default createStore({
    modules: {
        usuarioStore,
        cartaAstralStore
    },
    // plugins : [createPersistedState({
    //     storage: {
    //         getItem: (key) => ls.get(key),
    //         setItem: (key, value) => ls.set(key, value),
    //         removeItem: (key) => ls.remove(key),
    //       },
    // })],
    plugins : [createPersistedState()],
})
