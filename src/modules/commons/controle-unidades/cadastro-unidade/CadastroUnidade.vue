<template>
  <div>
    <v-card max-width="80%" class="mx-auto">
      <v-container>
        <v-col cols="12">
          <p class="headline titulo-grupo-infos">Dados da Unidade</p>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="Nome da Unidade"
            v-model="formulario.nomeUnidade"
            counter="15"
            :rules="[
              () =>
                (!!formulario.nomeUnidade &&
                  formulario.nomeUnidade.length <= 15) ||
                'O limite de caracteres é 15!'
            ]"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Grupo" v-model="formulario.grupo"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="idEstadoSelecionado"
            :items="estados"
            item-value="estadoId"
            item-text="nome"
            attach
            label="Estado"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="formulario.cidadeId"
            :items="cidades"
            item-value="cidadeId"
            item-text="nome"
            attach
            label="Cidade"
          ></v-select>
        </v-col>
      </v-container>
    </v-card>
    <div class="text-center">
      <v-btn
        class="ma-8"
        color="primary"
        @click="finalizarCadastro"
        :loading="loading"
        >Finalizar Cadastro</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    formulario: {
      nomeUnidade: "",
      grupo: "",
      estado: null,
      cidadeId: null
    },
    loading: false,
    idEstadoSelecionado: null
  }),
  mounted() {
    this.buscarEstados();
  },
  computed: {
    ...mapState("cadastroUnidade", ["estados"]),
    ...mapState("cadastroUnidade", ["cidades"])
  },
  watch: {
    idEstadoSelecionado: function() {
      this.formulario.estado = this.idEstadoSelecionado;
      this.buscarCidades(this.idEstadoSelecionado);
    }
  },
  methods: {
    ...mapActions("cadastroUnidade", ["ActionCadastrarUnidade"]),
    ...mapActions("cadastroUnidade", ["ActionBuscarEstados"]),
    ...mapActions("cadastroUnidade", ["ActionBuscarCidades"]),
    async buscarEstados() {
      try {
        await this.ActionBuscarEstados();
      } catch (err) {
        if (err.data) {
          for (const erro of err.data) {
            alert(erro.description);
          }
        } else {
          alert("Não foi possível encontrar os estados!");
        }
      }
    },
    async buscarCidades(idEstado) {
      try {
        await this.ActionBuscarCidades(idEstado);
      } catch (err) {
        if (err.data) {
          for (const erro of err.data) {
            alert(erro.description);
          }
        } else {
          alert("Não foi possível encontrar as cidades!");
        }
      }
    },
    async finalizarCadastro() {
      try {
        this.loading = true;
        //validar
        await this.ActionCadastrarUnidade(this.formulario);
        this.loading = false;
        alert("UNIDADE CADASTRADA COM SUCESSO!");
        this.limparCampos();
        //this.$router.push({ name: "listagemUnidades" });
      } catch (err) {
        this.loading = false;
        if (err.data) {
          for (const erro of err.data) {
            alert(erro.description);
          }
        } else {
          alert("Não foi possível cadastrar a unidade!");
        }
      }
    },
    limparCampos() {
      (this.formulario = {}), (this.idEstadoSelecionado = null);
    }
  }
};
</script>

<style scoped>
.col.col-12 {
  padding: 0px 12px;
}

.titulo-grupo-infos {
  color: #454545;
  margin-top: 24px;
  margin-bottom: 12px;
}
</style>
