import { routes as auth } from "../auth";
import { routes as home } from '../../modules/home'
import { routes as controle_cesso } from '../../modules/controle-acesso'
import { routes as controle_unidades } from '../../modules/commons/controle-unidades'

export default [
    ...auth,
    ...home,
    ...controle_cesso,
    ...controle_unidades
];
