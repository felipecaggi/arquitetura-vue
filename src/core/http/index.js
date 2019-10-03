import Vue from "vue";
import VueResource from "vue-resource";
import services from "./services";
import interceptors from "./interceptors";

Vue.use(VueResource);

const http = Vue.http;

http.options.root = "https://localhost:44356/api/";
//http.options.root = "https://10.88.76.36:5001/api/usuario/";

http.interceptors.push(interceptors);

Object.keys(services).map(service => {
  //isso transforma as objetos do services em requisicoes http
  services[service] = Vue.resource("", {}, services[service]);
});

const setBearerToken = token => {
  http.headers.common["Authorization"] = `Bearer ${token}`;
};

export default services;
export { http, setBearerToken };
