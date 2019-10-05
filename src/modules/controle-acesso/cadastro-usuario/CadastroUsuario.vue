<template>
  <div>
    <v-card max-width="80%" class="mx-auto">
      <v-container>
        <v-col cols="12">
          <p class="headline titulo-grupo-infos">Dados Pessoais</p>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Primeiro Nome" v-model="formulario.primeiroNome"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Sobrenome" v-model="formulario.sobrenome"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="E-mail" v-model="formulario.email"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Confirmação de E-mail" v-model="confirmacaoEmail"></v-text-field>
        </v-col>

        <v-col cols="12">
          <p class="headline titulo-grupo-infos">Dados Institucionais</p>
        </v-col>
        <v-col cols="12">
          <v-text-field label="SIAPE (opcional)" v-model="formulario.siape"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Lotação" v-model="formulario.lotacao"></v-text-field>
        </v-col>

        <v-col cols="12">
          <p class="headline titulo-grupo-infos">Contato</p>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Celular" v-model="formulario.celular"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Ramal (opcional)" v-model="formulario.ramal"></v-text-field>
        </v-col>

        <v-col cols="12">
          <p class="headline titulo-grupo-infos">Credenciais da Conta</p>
        </v-col>
        <v-col cols="12">
          <v-text-field label="CPF" v-model="formulario.cpf"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select v-model="formulario.permissoes" :items="opcoesPermissoes" item-value="valor" item-text="titulo" attach chips multiple label="Nível de Permissão"></v-select>
        </v-col>
        <v-col cols="12">
          <v-select v-if="formulario.permissoes.includes('OPERADOR')" v-model="formulario.temas" :items="opcoesTemas" item-value="valor" item-text="titulo" attach chips multiple label="Tema de Responsabilidade"></v-select>
        </v-col>
        <v-col cols="12" class="mt-4">
          <p>Este usuário será temporário?</p>
          <v-radio-group ref="modalidade" v-model="formulario.funcionariotemporario" :mandatory="true" row >
            <v-radio label="Sim" value="true"></v-radio>
            <v-radio label="Não" value="false"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="12">
          <v-menu
            ref="menu"
            v-if="formulario.funcionariotemporario === 'true'"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Data Final de Acesso"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <div class="flex-grow-1"></div>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

      </v-container>
    </v-card>
    <div class="text-center">
      <v-btn
        class="ma-8"
        color="primary"
        @click="finalizarCadastro"
        :loading="loading"
      >Finalizar Cadastro</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    formulario: {
      primeiroNome: "",
      sobrenome: "",
      email: "",
      siape: "",
      lotacao: "",
      celular: "",
      ramal: "",
      cpf: "",
      permissoes: [],
      temas: [],
      funcionariotemporario: "false",
    },
    opcoesPermissoes: [
      {
        titulo: "Administrador",
        valor: "ADMIN"
      },
      {
        titulo: "Membro da Comissão",
        valor: "MEMBROCOMISSAO"
      },
      {
        titulo: "Gestor",
        valor: "GESTOR"
      },
      {
        titulo: "Operador",
        valor: "OPERADOR"
      }
    ],
    opcoesTemas: [
      {
        titulo: "Energia Elétrica",
        valor: "ENERGIAELETRICA"
      },
      {
        titulo: "Água e Esgoto",
        valor: "AGUAESGOTO"
      },
      {
        titulo: "Compras e Contratações Sustentáveis",
        valor: "COMPRASCONTRATACOES"
      },
      {
        titulo: "Material de Consumo",
        valor: "MATERIALCONSUMO"
      },
      {
        titulo: "Coleta Seletiva",
        valor: "COLETASELETIVA"
      },
      {
        titulo: "Qualidade de Vida no Ambiente de Trabalho",
        valor: "QUALIDADEVIDA"
      },
      {
        titulo: "Deslocamento de Pessoal",
        valor: "DESLOCAMENTOPESSOAL"
      },
      {
        titulo: "Educação Ambiental",
        valor: "EDUCACAOAMBIENTAL"
      }
    ],
    confirmacaoEmail: "",
    loading: false,
    date: null,
    menu: false
  }),
  methods: {
    ...mapActions("cadastroUsuario", ["ActionCadastrarUsuario"]),
    async finalizarCadastro() {
      try {
        this.loading = true;
        //validar
        await this.ActionCadastrarUsuario(this.formulario);
        this.loading = false;
        alert("USUÁRIO CADASTRADO COM SUCESSO!")
        //this.$router.push({ name: "listagemUsuarios" });
      } catch (err) {
        this.loading = false;
        if(Array.isArray(err.data)){
          for (const erro of err.data){
            alert(erro.description)
          }
        }else if(err.data){
          alert(err.data.title)
        }else {
          alert("Não foi possível cadastrar o usuário!");
        }
      }
    }
  }
}
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
