import { store as auth } from "../auth";
import { store as controleAcesso } from "../../modules/controle-acesso"
import { store as controleUnidades } from "../../modules/commons/controle-unidades"
import { store as energiaEletricaContas} from "../../modules/controle-temas/energia-eletrica/energia-eletrica-contas";

export default {
  auth,
  controleAcesso,
  controleUnidades,
  energiaEletricaContas
};