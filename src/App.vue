<template>
  <v-app>
    <nav-bar v-if="showNavbar" @irPara="irPara" @deslogar="deslogar"></nav-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; Team Stormbreaker | 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {};
  },
  computed: {
    showNavbar() {
      return this.$route.name !== "login";
    }
  },
  methods: {
    ...mapActions("auth", ["ActionSignOut"]),
    irPara(pagina) {
      this.$router.push({ name: pagina });
    },
    deslogar() {
      this.ActionSignOut();
      this.$router.push({ name: "login" });
    }
  }
}
</script>
