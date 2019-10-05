<template>
  <v-container>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>SGDM</v-toolbar-title>
      <v-divider class="mx-12" vertical></v-divider>
      <v-toolbar-title>Application</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-title>Olá, {{ user.primeiroNome }}</v-toolbar-title>
      <v-divider class="mx-12" vertical></v-divider>
      <v-btn text rounded @click="$emit('deslogar')">
        <v-icon left>mdi-export</v-icon>Logout
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item @click="$emit('irPara', 'home')">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$emit('irPara', 'cadastroUsuario')">
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cadastro de Usuario</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$emit('irPara', 'cadastroUnidade')">
          <v-list-item-action>
            <v-icon size="22">fas fa-landmark</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cadastro de Unidade</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$emit('irPara', 'cadastroContrato')">
          <v-list-item-action>
            <v-icon size="22">mdi-file-document</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cadastro de Contrato</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$emit('irPara', 'cadastroConta')">
          <v-list-item-action>
            <v-icon size="22">mdi-white-balance-incandescent</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cadastro de Conta</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "NavBar",
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    ...mapState("auth", ["user"])
  }
};
</script>
