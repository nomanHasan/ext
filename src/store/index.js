import Vue from 'vue'
import Vuex from 'vuex'
import { DEMO_SESSION_LIST } from '../models/sessions.model'

Vue.use(Vuex)
export const SELECT_SESSION = 'SELECT_SESSION';

export default new Vuex.Store({
  state: {
    selectedSessionId: 0,
    sessions: DEMO_SESSION_LIST,
  },
  mutations: {
  },
  actions: {
    [SELECT_SESSION] ({state}, payload) {
      state.selectedSessionId = payload;
    },
  },
  getters: {
    sessions: (state) => state.sessions,
    selectedSessionId: (state) => state.selectedSessionId,
    selectedSession: (state) => {
      return state.sessions.find(s => s.id == state.selectedSessionId);
    },
  },
  modules: {
  }
})
