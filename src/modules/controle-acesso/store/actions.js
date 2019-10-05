import services from "@/core/http";

// eslint-disable-next-line
export const ActionCadastrarUsuario = ({}, payload) => {
  return services.cadastroUsuario.cadastrar(payload);
};
