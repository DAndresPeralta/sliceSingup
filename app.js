// ****************** LADO "BACK" Ó "SERVIDOR" ********************

import express from "express";
import handlebars from "express-handlebars";
// Estas lineas lo que hacen es arreglar el error del enrutamiento necesario para utiliza __dirname
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Forma para importar funciones, metodos desde otro archivo js (router)
import routesUser from "./router/users.router.js";
import routesLogin from "./router/login.router.js";

// Server: Creamos el servidor
// Con los siguientes pasos los que hacemos es levantar un servidor.
const app = express();
const PORT = 4000;

// ***** SETTINGS *****
// Hago mi carpeta public estatica para poder acceder
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
// Config Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
// Con esta config puedo leer por consola los json que envie o reciba. Sino lo pongo me saldria todo com undefined
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ***** ROUTES *****
//! Esto con HTML index
// !app.get("/", (req, res) => res.sendFile(__dirname + "/pages/singup.html"));

//? Esto es HANDLEBARS
app.get("/index", (req, res) => {
  res.render("admin");
});
app.get("/", (req, res) => {
  res.render("index");
});

// Al presionar "registrar" en la pagina, se envia mediante fetch un metodo post que se comunica, en el back, con "api/register", este a su vez se comunica con el router-
app.use("/api", routesUser);
app.use("/api", routesLogin);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
