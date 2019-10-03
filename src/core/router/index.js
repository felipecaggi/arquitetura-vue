import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import BeforeEach from "./BeforeEach";

Vue.use(Router);

const router = new Router({ routes });

router.beforeEach(BeforeEach);

export default router;


