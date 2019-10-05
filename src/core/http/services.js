import { services as auth } from "../auth";
import { services as controleAcesso } from "../../modules/controle-acesso";
import { services as controleUnidades } from "../../modules/commons/controle-unidades";
import { services as energiaEletricaContas } from "../../modules/controle-temas/energia-eletrica/energia-eletrica-contas";

export default {
    auth,
    controleAcesso,
    controleUnidades,
    energiaEletricaContas
};
