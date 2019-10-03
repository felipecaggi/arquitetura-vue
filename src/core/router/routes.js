import { routes as auth } from "../auth";
import { routes as modulesRoutes } from "../../modules/ModuleRoutes";

export default [...auth, ...modulesRoutes];
