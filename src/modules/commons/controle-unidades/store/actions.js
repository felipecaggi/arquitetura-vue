import services from "@/core/http";
import * as types from "./mutation-types";

// eslint-disable-next-line
export const ActionCadastrarUnidade = ({}, payload) => {
  return services.cadastroUnidade.cadastrar(payload);
};

export const ActionBuscarEstados = ({ commit }) => {
  return services.cadastroUnidade.buscarEstados().then(res => {
    commit(types.SET_ESTADOS, res.data);
  });
};

export const ActionBuscarCidades = ({ commit }, payload) => {
  return services.cadastroUnidade.buscarCidades({ id: payload }).then(res => {
    commit(types.SET_CIDADES, res.data);
  });
};

