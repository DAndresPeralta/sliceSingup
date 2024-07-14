// ****************** LADO "BACK" Ó "SERVIDOR" ********************

import express from "express";

// Estas lineas lo que hacen es arreglar el error del enrutamiento necesario para utiliza __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Forma para importar funciones, metodos desde otro archivo js (controllers)
import { methods as authentication } from "./controllers/authentication.controller.js";

// Server: Creamos el servidor
// Con los siguientes pasos los que hacemos es levantar un servidor.
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log(`Corriento en puerto: ${app.get("port")}`);

// Settings.
// Hago mi carpeta public estatica para poder acceder
const publicPath = path.resolve(__dirname, "public");
console.log(publicPath);
app.use(express.static(publicPath));
// Con esta config puedo leer por consola los json que envie o reciba. Sino lo pongo me saldria todo com undefined
app.use(express.json());

// Rutas. En "/coloco la ruta http"
app.get("/", (req, res) => res.sendFile(__dirname + "/pages/singup.html"));
// Al presionar "registrar" en la pagina, se envia mediante fetch un metodo post que se comunica, en el back, con "api/register", este a su vez se comunica con el controlador-
app.post("/api/register", authentication.register);