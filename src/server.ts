import App from "@/app";
import IndexRoute from "@/generic/routes/index.route";
import validateEnv from "@utils/validateEnv";
import { endpoints } from "@modules/index";

validateEnv();

const app = new App([new IndexRoute(), ...endpoints]);

app.listen();
