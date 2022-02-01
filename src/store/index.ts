import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    lastUpdate: new Date('01.01.1962'),
    earthquakes: {},
  },
  mutations: {
    updateEarthquakes(state, earthquakes) {
      state.earthquakes = earthquakes;
      state.lastUpdate = new Date();
    },
  },
  getters: {
    lastUpdate: state => state.lastUpdate,
    earthquakes: state => state.earthquakes,
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
