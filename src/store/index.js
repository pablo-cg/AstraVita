import { createStore } from 'vuex'

export default createStore({
  state: {
      conSesionIniciada: false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {

  },
  getters:{
      getConSesionIniciada: (state) => state.conSesionIniciada,
  }
})
