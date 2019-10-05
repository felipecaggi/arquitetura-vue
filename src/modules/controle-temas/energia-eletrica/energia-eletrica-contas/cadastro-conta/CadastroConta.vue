<template>
  <v-card max-width="80%" class="mx-auto">
    <v-card max-width="100%" class="mx-auto">
      <v-card-title>Dados Gerais</v-card-title>

      <v-card-text>
        <v-col cols="12">
          <v-combobox
            ref="NumUnidadeConsumidora"
            v-model="NumUnidadeConsumidora"
            label="Unidade Consumidora"
            hint="Insira o número de uma unidade consumidora para liberar os próximos campos"
            required
            :clearable="clearable"
            :multiple="multiple"
            :persistent-hint="persistentHint"
            :small-chips="chips"
            :outlined="outlined"
          ></v-combobox>
        </v-col>

        <v-col cols="12">
          <v-combobox
            ref="ContratoNumero"
            v-model="ContratoNumero"
            label="Contrato"
            hint="Selecione um dos contratos referentes à unidade"
            required
            :clearable="clearable"
            :disabled="disabledContrato"
            :items="ListaDeContratoNumero"
            :multiple="multiple"
            :persistent-hint="persistentHint"
            :small-chips="chips"
            :outlined="outlined"
          ></v-combobox>
        </v-col>

        <v-col cols="12">
          <v-combobox
            ref="Aditivo"
            v-model="Aditivo"
            label="Aditivo"
            hint="Selecione o aditivo do contrato"
            required
            :clearable="clearable"
            :disabled="disabledAditivo"
            :items="ListaDeAditivo"
            :multiple="multiple"
            :persistent-hint="persistentHint"
            :small-chips="chips"
            :outlined="outlined"
          ></v-combobox>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="Referencia"
                    label="Conta referente ao mês"
                    prepend-icon="mdi-calendar"
                    readonly
                    required
                    v-on="on"
                    :outlined="outlined"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="Referencia"
                  type="month"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="DataLeituraAtual"
                    label="Data da leitura atual"
                    prepend-icon="mdi-calendar"
                    readonly
                    required
                    v-on="on"
                    :outlined="outlined"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="DataLeituraAtual"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="DataLeituraAnterior"
                    label="Data da leitura anterior"
                    prepend-icon="mdi-calendar"
                    readonly
                    required
                    v-on="on"
                    :outlined="outlined"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="DataLeituraAnterior"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-card-text>
    </v-card>
    <v-card :disabled="disabledStepper">
      <v-stepper v-model="e1" non-linear vertical>
        <v-stepper-step :complete="e1 > 1" step="1" editable>
          Consumo
          <small>Informações sobre consumo gasto</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="lighten-1" class="mb-12">
            <fieldset
              v-if="formularioConsumo.consumoPonta.includes(Modalidade)"
            >
              <legend>Ponta</legend>

              <v-text-field
                label="Dias faturados*"
                v-model="ConsumoPontaFaturado"
                ref="ConsumoPontaFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="ConsumoPontaTarifaSemImpostos"
                ref="ConsumoPontaTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="ConsumoPontaTarifaComImpostos"
                ref="ConsumoPontaTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>

            <fieldset
              v-if="formularioConsumo.consumoForaPonta.includes(Modalidade)"
            >
              <legend>Fora Ponta</legend>
              <v-text-field
                label="Dias faturados*"
                v-model="ConsumoForaPontaFaturado"
                ref="ConsumoForaPontaFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="ConsumoForaPontaTarifaSemImpostos"
                ref="ConsumoForaPontaTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="ConsumoForaPontaTarifaComImpostos"
                ref="ConsumoForaPontaTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>

            <fieldset
              v-if="formularioConsumo.consumoIntermediario.includes(Modalidade)"
            >
              <legend>Intermediário</legend>
              <v-text-field
                label="Dias faturados*"
                v-model="ConsumoIntermediarioFaturado"
                ref="ConsumoIntermediarioFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="ConsumoIntermediarioTarifaSemImpostos"
                ref="ConsumoIntermediarioTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="ConsumoIntermediarioTarifaComImpostos"
                ref="ConsumoIntermediarioTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>
          </v-card>
          <v-btn color="primary" @click="e1 = 2">Avançar</v-btn>
          <v-btn text>Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e1 > 2" step="2" editable
          >Bandeira</v-stepper-step
        >

        <v-stepper-content step="2">
          <v-card color="lighten-1" class="mb-12">
            <v-radio-group
              ref="Bandeira"
              v-model="Bandeira"
              required
              :mandatory="true"
              row
            >
              <v-radio label="Verde" color="green" value="VERDE"></v-radio>

              <v-radio label="Amarela" color="yellow" value="AMARELA"></v-radio>

              <v-radio label="Vermelha" color="red" value="VERMELHA"></v-radio>
            </v-radio-group>

            <v-text-field
              label="Valor (R$)*"
              v-model="BandeiraValor"
              ref="BandeiraValor"
              required
              type="number"
              :rules="rules"
            ></v-text-field>
          </v-card>
          <v-btn color="primary" @click="e1 = 3">Avançar</v-btn>
          <v-btn text>Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e1 > 3" step="3" editable
          >Energia Reativa Excedente</v-stepper-step
        >

        <v-stepper-content step="3">
          <v-card color="lighten-1" class="mb-12">
            <fieldset
              v-if="formularioEnergiaReativa.ponta.includes(Modalidade)"
            >
              <legend>Ponta</legend>
              <v-text-field
                label="Dias faturados*"
                v-model="EnergiaReativaExcedentePontaFaturado"
                ref="EnergiaReativaExcedentePontaFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="EnergiaReativaExcedentePontaTarifaSemImpostos"
                ref="EnergiaReativaExcedentePontaTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="EnergiaReativaExcedentePontaTarifaComImpostos"
                ref="EnergiaReativaExcedentePontaTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>

            <fieldset
              v-if="formularioEnergiaReativa.foraPonta.includes(Modalidade)"
            >
              <legend>Fora ponta</legend>
              <v-text-field
                label="Dias faturados*"
                v-model="EnergiaReativaExcedenteForaPontaFaturado"
                ref="EnergiaReativaExcedenteForaPontaFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="EnergiaReativaExcedenteForaPontaTarifaSemImpostos"
                ref="EnergiaReativaExcedenteForaPontaTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="EnergiaReativaExcedenteForaPontaTarifaComImpostos"
                ref="EnergiaReativaExcedenteForaPontaTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>
          </v-card>
          <v-btn color="primary" @click="e1 = 4">Avançar</v-btn>
          <v-btn text>Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e1 > 4" step="4" editable
          >Demanda</v-stepper-step
        >

        <v-stepper-content step="4">
          <v-card color="lighten-1" class="mb-12">
            <fieldset v-if="formularioDemanda.ponta.includes(Modalidade)">
              <legend>Ponta</legend>
              <v-text-field
                label="Dias faturados*"
                v-model="DemandaPontaFaturado"
                ref="DemandaPontaFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="DemandaPontaTarifaSemImpostos"
                ref="DemandaPontaTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="DemandaPontaTarifaComImpostos"
                ref="DemandaPontaTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>

            <fieldset v-if="formularioDemanda.foraPonta.includes(Modalidade)">
              <legend>Ponta</legend>
              <v-text-field
                label="Dias faturados*"
                v-model="DemandaForaPontaFaturado"
                ref="DemandaForaPontaFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="DemandaForaPontaTarifaSemImpostos"
                ref="DemandaForaPontaTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="DemandaForaPontaTarifaComImpostos"
                ref="DemandaForaPontaTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>

            <!-- <fieldset v-if="formularioDemanda.ultrapassadaPonta.includes(Modalidade)">
                <legend>Ponta</legend>
                <v-text-field
                  label="Dias faturados*"
                  v-model="DemandaUltrapassadaPontaFaturado"
                  ref="DemandaUltrapassadaPontaFaturado"
                  required
                  type="number"

                  :rules="rules"
                ></v-text-field>

                <v-text-field
                  label="Tarifa sem impostos*"
                  v-model="DemandaUltrapassadaPontaTarifaSemImpostos"
                  ref="DemandaUltrapassadaPontaTarifaSemImpostos"
                  required
                  type="number"

                  :rules="rules"
                ></v-text-field>

                <v-text-field
                  label="Tarifa com impostos*"
                  v-model="DemandaUltrapassadaPontaTarifaComImpostos"
                  ref="DemandaUltrapassadaPontaTarifaComImpostos"
                  required
                  type="number"
                  :rules="rules"

                ></v-text-field>
              </fieldset> -->

            <fieldset
              v-if="
                formularioDemanda.ultrapassadaForaPonta.includes(Modalidade)
              "
            >
              <legend>Ponta</legend>
              <v-text-field
                label="Dias faturados*"
                v-model="DemandaUltrapassadaForaPontaFaturado"
                ref="DemandaUltrapassadaForaPontaFaturado"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa sem impostos*"
                v-model="DemandaUltrapassadaForaPontaTarifaSemImpostos"
                ref="DemandaUltrapassadaForaPontaTarifaSemImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>

              <v-text-field
                label="Tarifa com impostos*"
                v-model="DemandaUltrapassadaForaPontaTarifaComImpostos"
                ref="DemandaUltrapassadaForaPontaTarifaComImpostos"
                required
                type="number"
                :rules="rules"
              ></v-text-field>
            </fieldset>
          </v-card>
          <v-btn color="primary" @click="e1 = 5">Avançar</v-btn>
          <v-btn text>Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-step step="5" editable
          >Lançamentos e serviços</v-stepper-step
        >

        <v-stepper-content step="5">
          <v-card color="lighten-1" class="mb-12">
            <v-text-field
              label="Juros"
              v-model="Juros"
              ref="Juros"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Restituição"
              v-model="Restituicao"
              ref="Restituicao"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Compensação"
              v-model="Compensacao"
              ref="Compensacao"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="IRPJ Retido"
              v-model="IRPJRetido"
              ref="IRPJRetido"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Contribuição Social"
              v-model="ContribuicaoSocial"
              ref="ContribuicaoSocial"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Cofins Geral"
              v-model="CofinsGeral"
              ref="CofinsGeral"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Confins Retido"
              v-model="ConfinsRetido"
              ref="ConfinsRetido"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Pis/Pasep Geral"
              v-model="PisGeral"
              ref="PisGeral"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Pis Retido"
              v-model="PisRetido"
              ref="PisRetido"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="ICMS"
              v-model="ICMS"
              ref="ICMS"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Iluminação Pública"
              v-model="IluminacaoPublica"
              ref="IluminacaoPublica"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Outros"
              v-model="Outros"
              ref="Outros"
              type="number"
              :rules="rules"
            ></v-text-field>

            <v-col cols="12">
              <v-textarea
                label="Observações"
                v-model="Observacoes"
                ref="Observacoes"
                outlined
              ></v-textarea>
            </v-col>
          </v-card>
          <v-btn color="primary" @click="finalizarCadastro" :loading="loading"
            >Finalizar Cadastro</v-btn
          >
          <v-btn text>Voltar</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
//import { ActionBuscarUnidadeConsumidora } from "../store/actions";

export default {
  name: "CadastroConta",

  data: () => ({
    menu1: false,
    menu2: false,
    menu3: false,

    // step 0 - dados gerais da conta
    NumUnidadeConsumidora: null,

    ListaDeContrato: null,
    ListaDeContratoNumero: null,
    ContratoNumero: null,

    ListaDeAditivo: null,
    Aditivo: null,

    Modalidade: null,

    Referencia: new Date().toISOString().substr(0, 7),
    DataLeituraAtual: null,
    DataLeituraAnterior: null,

    // step 1 - consumo
    ConsumoPontaFaturado: null,
    ConsumoPontaTarifaSemImpostos: null,
    ConsumoPontaTarifaComImpostos: null,

    ConsumoForaPontaFaturado: null,
    ConsumoForaPontaTarifaSemImpostos: null,
    ConsumoForaPontaTarifaComImpostos: null,

    ConsumoIntermediarioFaturado: null,
    ConsumoIntermediarioTarifaSemImpostos: null,
    ConsumoIntermediarioTarifaComImpostos: null,

    // step 2 - bandeira
    Bandeira: null,
    BandeiraValor: null,

    // stepper 3 - reativa
    EnergiaReativaExcedentePontaFaturado: null,
    EnergiaReativaExcedentePontaTarifaSemImpostos: null,
    EnergiaReativaExcedentePontaTarifaComImpostos: null,

    EnergiaReativaExcedenteForaPontaFaturado: null,
    EnergiaReativaExcedenteForaPontaTarifaSemImpostos: null,
    EnergiaReativaExcedenteForaPontaTarifaComImpostos: null,

    // stepper 4 - demanda
    DemandaPontaFaturado: null,
    DemandaPontaTarifaSemImpostos: null,
    DemandaPontaTarifaComImpostos: null,

    DemandaForaPontaFaturado: null,
    DemandaForaPontaTarifaSemImpostos: null,
    DemandaForaPontaTarifaComImpostos: null,

    // DemandaUltrapassadaPontaFaturado: null,
    // DemandaUltrapassadaPontaTarifaSemImpostos: null,
    // DemandaUltrapassadaPontaTarifaComImpostos: null,

    DemandaUltrapassadaForaPontaFaturado: null,
    DemandaUltrapassadaForaPontaTarifaSemImpostos: null,
    DemandaUltrapassadaForaPontaTarifaComImpostos: null,

    // stepper 5 - outras informações
    Juros: null,
    Restituicao: null,
    Compensacao: null,
    IRPJRetido: null,
    ContribuicaoSocial: null,
    CofinsGeral: null,
    ConfinsRetido: null,
    PisGeral: null,
    PisRetido: null,
    ICMS: null,
    IluminacaoPublica: null,
    Outros: null,
    Observacoes: null,

    // Controle de campos desativados
    disabledContrato: true,
    disabledAditivo: true,
    disabledStepper: true,

    // stepper
    e1: 0,

    // stepper 1 ----------------------------------------------------
    formularioConsumo: {
      consumoPonta: ["AZUL", "VERDE", "BRANCAB"],
      consumoForaPonta: ["AZUL", "VERDE", "BRANCAB", "CONVENCIONALB"],
      consumoIntermediario: ["BRANCAB"]
    },

    // stepper 3 ----------------------------------------------------
    formularioEnergiaReativa: {
      ponta: ["AZUL"],
      foraPonta: ["AZUL", "VERDE", "BRANCAB", "CONVENCIONALB"]
    },

    // stepper 4 ----------------------------------------------------
    formularioDemanda: {
      ponta: ["AZUL"],
      foraPonta: ["AZUL", "VERDE"],
      //ultrapassadaPonta: [],
      ultrapassadaForaPonta: ["AZUL", "VERDE"]
    },

    // form attributes
    chips: true,
    clearable: true,
    hideSelected: true,
    multiple: false,
    outlined: false,
    persistentHint: true,
    readonly: false,

    loading: false,

    rules: [value => !!value || "Este campo é obrigatório"]
  }),

  computed: {
    ...mapState("cadastroConta", ["contratos"]),
    form() {
      var conta = {};

      // step 0 - dados gerais da conta
      conta.ContratoId = this.ContratoNumero + this.Aditivo;
      conta.NumUnidadeConsumidora = this.NumUnidadeConsumidora;
      conta.Modalidade = this.Modalidade;
      conta.Referencia = this.Referencia;
      conta.DataLeituraAtual = this.DataLeituraAtual;
      conta.DataLeituraAnterior = this.DataLeituraAnterior;

      // step 1 - consumo
      conta.ConsumoPontaFaturado = this.ConsumoPontaFaturado;
      conta.ConsumoPontaTarifaSemImpostos = this.ConsumoPontaTarifaSemImpostos;
      conta.ConsumoPontaTarifaComImpostos = this.ConsumoPontaTarifaComImpostos;

      conta.ConsumoForaPontaFaturado = this.ConsumoForaPontaFaturado;
      conta.ConsumoForaPontaTarifaSemImpostos = this.ConsumoForaPontaTarifaSemImpostos;
      conta.ConsumoForaPontaTarifaComImpostos = this.ConsumoForaPontaTarifaComImpostos;

      conta.ConsumoIntermediarioFaturado = this.ConsumoIntermediarioFaturado;
      conta.ConsumoIntermediarioTarifaSemImpostos = this.ConsumoIntermediarioTarifaSemImpostos;
      conta.ConsumoIntermediarioTarifaComImpostos = this.ConsumoIntermediarioTarifaComImpostos;

      // step 2 - bandeira
      conta.Bandeira = this.Bandeira;
      conta.BandeiraValor = this.BandeiraValor;

      // stepper 3 - reativa
      conta.EnergiaReativaExcedentePontaFaturado = this.EnergiaReativaExcedentePontaFaturado;
      conta.EnergiaReativaExcedentePontaTarifaSemImpostos = this.EnergiaReativaExcedentePontaTarifaSemImpostos;
      conta.EnergiaReativaExcedentePontaTarifaComImpostos = this.EnergiaReativaExcedentePontaTarifaComImpostos;

      conta.EnergiaReativaExcedenteForaPontaFaturado = this.EnergiaReativaExcedenteForaPontaFaturado;
      conta.EnergiaReativaExcedenteForaPontaTarifaSemImpostos = this.EnergiaReativaExcedenteForaPontaTarifaSemImpostos;
      conta.EnergiaReativaExcedenteForaPontaTarifaComImpostos = this.EnergiaReativaExcedenteForaPontaTarifaComImpostos;

      // stepper 4 - demanda
      conta.DemandaPontaFaturado = this.DemandaPontaFaturado;
      conta.DemandaPontaTarifaSemImpostos = this.DemandaPontaTarifaSemImpostos;
      conta.DemandaPontaTarifaComImpostos = this.DemandaPontaTarifaComImpostos;

      conta.DemandaForaPontaFaturado = this.DemandaForaPontaFaturado;
      conta.DemandaForaPontaTarifaSemImpostos = this.DemandaForaPontaTarifaSemImpostos;
      conta.DemandaForaPontaTarifaComImpostos = this.DemandaForaPontaTarifaComImpostos;

      // conta.DemandaUltrapassadaPontaFaturado = this.DemandaUltrapassadaPontaFaturado;
      // conta.DemandaUltrapassadaPontaTarifaSemImpostos = this.DemandaUltrapassadaPontaTarifaSemImpostos;
      // conta.DemandaUltrapassadaPontaTarifaComImpostos = this.DemandaUltrapassadaPontaTarifaComImpostos;

      conta.DemandaUltrapassadaForaPontaFaturado = this.DemandaUltrapassadaForaPontaFaturado;
      conta.DemandaUltrapassadaForaPontaTarifaSemImpostos = this.DemandaUltrapassadaForaPontaTarifaSemImpostos;
      conta.DemandaUltrapassadaForaPontaTarifaComImpostos = this.DemandaUltrapassadaForaPontaTarifaComImpostos;

      // stepper 5 - outras informações
      conta.Juros = this.Juros;
      conta.Restituicao = this.Restituicao;
      conta.Compensacao = this.Compensacao;
      conta.IRPJRetido = this.IRPJRetido;
      conta.ContribuicaoSocial = this.ContribuicaoSocial;
      conta.CofinsGeral = this.CofinsGeral;
      conta.ConfinsRetido = this.ConfinsRetido;
      conta.PisGeral = this.PisGeral;
      conta.PisRetido = this.PisRetido;
      conta.ICMS = this.ICMS;
      conta.IluminacaoPublica = this.IluminacaoPublica;
      conta.Outros = this.Outros;
      conta.Observacoes = this.Observacoes;

      return conta;
    }
  },

  watch: {
    NumUnidadeConsumidora: function() {
      if (this.NumUnidadeConsumidora != null) {
        this.buscarContratos(this.NumUnidadeConsumidora);
        //this.buscarUnidadeConsumidora(this.NumUnidadeConsumidora);
        console.log(this.contratos);
        // this.ListaDeContrato = this.contratos;

        this.ListaDeContrato = [
          {
            ContratoId: 100,
            Aditivo: "1",
            ContratoNumero: "1234",
            DemandaContratada: 2.1000000000000001,
            DemandaForaPontaContratada: 2.2999999999999998,
            DemandaPontaContratada: 2.2000000000000002,
            Modalidade: "Azul",
            TensaoContratada: 2.0,
            UsuarioId: "02fe19f2-aa24-4345-af91-dece9ecfd9b5"
          },
          {
            ContratoId: 200,
            Aditivo: "2",
            ContratoNumero: "1234",
            DemandaContratada: 3.1000000000000001,
            DemandaForaPontaContratada: 3.2999999999999998,
            DemandaPontaContratada: 3.2000000000000002,
            Modalidade: "Azul",
            TensaoContratada: 3.0,
            UsuarioId: "02fe19f2-aa24-4345-af91-dece9ecfd9b5"
          },
          {
            ContratoId: 300,
            Aditivo: "1",
            ContratoNumero: "3421",
            DemandaForaPontaContratada: 3.0,
            Modalidade: "Verde",
            TensaoContratada: 2.0,
            UsuarioId: "02fe19f2-aa24-4345-af91-dece9ecfd9b5"
          },
          {
            ContratoId: 400,
            Aditivo: "1",
            ContratoNumero: "4421",
            Modalidade: "Branca",
            TensaoContratada: 2.0,
            UsuarioId: "02fe19f2-aa24-4345-af91-dece9ecfd9b5"
          },
          {
            ContratoId: 500,
            Aditivo: "1",
            ContratoNumero: "4423",
            Modalidade: "Convencional B",
            TensaoContratada: 2.0,
            UsuarioId: "02fe19f2-aa24-4345-af91-dece9ecfd9b5"
          }
        ];

        var contratoNumero = [];
        this.ListaDeContrato.forEach(function(obj) {
          if (!contratoNumero.includes(obj.ContratoNumero))
            contratoNumero.push(obj.ContratoNumero);
        });
        this.ListaDeContratoNumero = contratoNumero;
        this.disabledContrato = false;
      } else {
        //this.ListaDeContrato = null;
        this.ListaDeAditivo = null;
        this.ContratoId = null;
        this.disabledContrato = true;
      }
    },

    ContratoNumero: function() {
      console.log("Entrei here");
      if (this.ContratoNumero != null) {
        var aditivo = [];
        this.ListaDeContrato.forEach(function(obj) {
          // if (this.ContratoNumero === obj.ContratoNumero)
            aditivo.push(obj.Aditivo);
        });
        this.ListaDeAditivo = aditivo;
        this.disabledAditivo = false;
        console.log("cheguei jere");
      } else {
        this.disabledAditivo = true;
      }
    },

    Aditivo: function() {
      if (this.Aditivo != null) {
        var modalidade = null;
        // this.ListaDeContrato.forEach(function(obj) {
        //   if (
        //     this.ContratoNumero === obj.ContratoNumero &&
        //     this.Aditivo === obj.Aditivo
        //   )
        //     modalidade = obj.Modalidade;
        // });
        this.Modalidade = "AZUL";
        this.disabledStepper = false;
      } else {
        this.disabledAditivo = true;
      }
    }
  },

  methods: {
    ...mapActions("cadastroConta", ["ActionBuscarContratos"]),
    ...mapActions("cadastroConta", ["ActionCadastrarConta"]),
    async buscarContratos(NumUnidadeConsumidora) {
      try {
        await this.ActionBuscarContratos(NumUnidadeConsumidora);
      } catch (err) {
        if (err.data) {
          for (const erro of err.data) {
            alert(erro.description);
          }
        } else {
          alert("Não foi possível encontrar os contratos!");
        }
      }
    },

    // async buscarUnidadeConsumidora(NumUnidadeConsumidora) {
    //   var ListaDeContrato = null;
    //
    //   //await ActionBuscarUnidadeConsumidora(NumUnidadeConsumidora)
    //   console.log("DEBUG: " + NumUnidadeConsumidora );
    //   await this.ActionBuscarUnidadeConsumidora(NumUnidadeConsumidora)
    //     .then(response => {
    //       return response;
    //     })
    //     .catch(error => {
    //       // if (error) {
    //       //   alert(error.description);
    //       // } else {
    //       alert(
    //         "Unidade consumidora " + NumUnidadeConsumidora + " não encontrada!"
    //       );
    //       // }
    //     })
    //     .finally(() => {
    //       ListaDeContrato = [
    //         {
    //           ContratoId: 2,
    //           ContratoNumero: "929292",
    //           Aditivo: "2",
    //           Modalidade: "AZUL"
    //         },
    //         {
    //           ContratoId: 3,
    //           ContratoNumero: "929292",
    //           Aditivo: "1",
    //           Modalidade: "BRANCA"
    //         },
    //         {
    //           ContratoId: 4,
    //           ContratoNumero: "23212",
    //           Aditivo: "1",
    //           Modalidade: "BRANCA"
    //         }
    //       ];
    //     });
    //   return ListaDeContrato;
    // },

    getContratoNumeroAditivo(item) {
      var contratoNumero = [
        "Contrato " + item.ContratoNumero,
        "Aditivo " + item.Aditivo
      ].join(" ");
      return contratoNumero;
    },

    async finalizarCadastro() {
      try {
        this.loading = true;
        console.log(this.form());
        await this.ActionCadastrarConta(this.form());
        this.loading = false;
        alert("CONTRATO CADASTRADO COM SUCESSO!");
      } catch (err) {
        this.loading = false;
        if (err.data) {
          for (const erro of err.data) {
            alert(erro.description);
          }
        } else {
          alert("Não foi possível cadastrar o contrato!");
        }
      }
    }
  },

  created: function() {}
};
</script>

<style scoped>
fieldset {
  margin-top: 24px;
  font-size: 24px;
  border: none;
}
</style>
