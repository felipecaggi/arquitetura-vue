import * as types from "./mutation-types";

export default {
  [types.SET_CONTRATOS](state, payload) {
    state.contratos = payload;
  }
};
