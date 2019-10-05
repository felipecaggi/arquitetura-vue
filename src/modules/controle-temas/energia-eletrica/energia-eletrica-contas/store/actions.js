import services from "@/core/http";
import * as types from "./mutation-types";

export const ActionCadastrarConta = payload => {
  return services.cadastroConta.cadastrar(payload);
};

export const ActionBuscarContratos = ({ commit }, payload) => {
    return services.cadastroConta.buscarContratos({ id: payload }).then(res => {
        commit(types.SET_CONTRATOS, res.data);
    });
};


// export const ActionBuscarUnidadeConsumidora = ({ commit }, payload) => {
//   return services.cadastroConta
//     .buscarUnidadeConsumidoramidora(payload)()
//     .then(res => {
//       commit(types.SET_CONTRATOS, res.data);
//     });
//
// };

export const ActionBuscarUnidadeConsumidora = ({ commit }, payload) => {
    console.log(payload);
    return services.cadastroConta.buscarUnidadeConsumidora({ id: payload }).then(res => {
        commit(types.SET_CIDADES, res.data);
    });
};
