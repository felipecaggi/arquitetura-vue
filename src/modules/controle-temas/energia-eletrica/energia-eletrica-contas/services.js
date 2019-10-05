export default {
  buscarContratos: {
    method: "get",
    url: "contrato/listar/unidadeconsumidoranumero?numero={id}"
  },

  buscarCidades: { method: "get", url: "localizacao/cidades{/id}" },
  cadastrar: { method: "post", url: "ContaConsumoEnergiaEletrica" }
};
