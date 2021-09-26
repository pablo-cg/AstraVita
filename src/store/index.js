import { createStore } from 'vuex'
import usuarioStore from './modules/usuarioStore';
import cartaAstralStore from './modules/cartaAstralStore';

export default createStore({
    modules: {
        usuarioStore,
        cartaAstralStore
    },
})
