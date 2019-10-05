<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>Login</v-toolbar-title>
                        <div class="flex-grow-1"></div>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    label="CPF"
                                    name="cpf"
                                    v-model="form.login"
                                    prepend-icon="mdi-account"
                                    type="text"
                            ></v-text-field>

                            <v-text-field
                                    id="senha"
                                    label="Senha"
                                    name="senha"
                                    v-model="form.password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <div class="text-center">
                        <v-btn
                                class="mb-8"
                                color="primary"
                                @click="submit()"
                                :loading="loading"
                        >Entrar</v-btn
                        >
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { mapActions } from "vuex";

    export default {

        data: () => ({
            form: {
                login: "admin",
                password: "317fdb19-4cbc-4088-836b-9d74c7279e5d"
            },
            loading: false
        }),
        methods: {
            ...mapActions("auth", ["ActionDoLogin"]),
            async submit() {
                try {
                    this.loading = true;
                    await this.ActionDoLogin(this.form);
                    this.loading = false;
                    this.$router.push({ name: "home" });
                } catch (err) {
                    this.loading = false;
                    alert(err.data ? err.data.message : "Não foi possível fazer login");
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .login-page {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        .card {
            width: 30%;
            background-color: blue;
        }
    }
</style>
