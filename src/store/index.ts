import { createStore } from 'vuex'

export default createStore({
  state: {
    mapOptions: [],
    earthquakes: {},
  },
  mutations: {
  },
  getters: {
    getMapOptions: state => state.mapOptions,
    earthquakes: state => state.earthquakes,
  },
  actions: {
  },
  modules: {
  }
})
