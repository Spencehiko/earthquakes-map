import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    lastUpdate: new Date('01.01.1962'),
    earthquakes: {},
    mapCenter: {lat:0, lng:0}
  },
  mutations: {
    updateEarthquakes(state, earthquakes) {
      state.earthquakes = earthquakes;
      state.lastUpdate = new Date();
    },
    updateMapCenter(state, center) {
      state.mapCenter = center;
    },
  },
  getters: {
    lastUpdate: state => state.lastUpdate,
    earthquakes: state => state.earthquakes,
    mapCenter: state => state.mapCenter,
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
