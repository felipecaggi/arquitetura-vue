export default {
  cadastrar: { method: "post", url: "unidade/cadastrar" },
  buscarEstados: { method: "get", url: "localizacao/estados" },
  buscarCidades: { method: "get", url: "localizacao/cidades{/id}" }
};
