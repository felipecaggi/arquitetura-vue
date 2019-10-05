import * as types from "./mutation-types";

export default {
  [types.SET_ESTADOS](state, payload) {
    state.estados = payload;
  },
  [types.SET_CIDADES](state, payload) {
    state.cidades = payload;
  }
};
