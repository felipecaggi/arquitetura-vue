<template src="./LoginTemplate.html"></template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "LoginScript",

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
