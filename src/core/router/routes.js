import { routes as auth } from "../auth";
import { routes as home } from '../../modules/home'
import { routes as controle_cesso } from '../../modules/controle-acesso'
import { routes as controle_unidades } from '../../modules/commons/controle-unidades'
import { routes as energia_eletrica_contas } from '../../modules/controle-temas/energia-eletrica/energia-eletrica-contas'

export default [
    ...auth,
    ...home,
    ...controle_cesso,
    ...controle_unidades,
    ...energia_eletrica_contas
];
