import express from "express";
import bcryptjs from "bcryptjs";
const router = express.Router();

import { methods as authentication } from "../utils/users.utils.js";

authentication.initializerFile();

router.post("/login", async (req, res) => {
  const users = authentication.getUsersToFile();
  const email = req.body.email;
  const password = req.body.password;

  // Validacion para que se ingresen obligatoriamente ambos campos.
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Campos incompletos" });
  }

  // Revisamos el array y traemos el que coincide
  const userCheck = users.find((user) => user.email === email);
  // Se comparan las contraseñas
  const loginCheck = await bcryptjs.compare(password, userCheck.password);
  // Si no existe el usuario se rechaza
  if (!userCheck) {
    return res
      .status(404)
      .send({ status: "Error", message: "Usuario inexistente" });
  }
  // Si no existe coincidencia de contraseña se rechaza
  if (!loginCheck) {
    return res
      .status(404)
      .send({ status: "Error", message: "Contraseña incorrecta" });
    // Si el usuario no es ADMINISTRADOR se rechaza
  } else if (userCheck.admin === false) {
    return res
      .status(404)
      .send({ status: "Error", message: "Usted no es ADMINISTRADOR" });
  } else {
    //En el atributo redirect colocamos la ruta ENDPOINT, que será capturada por res y enviada como respuesta al fetch del lado del CLIENTE, el cual renderizará la page a partir del endpoint.
    return res.status(200).send({
      status: "ok",
      message: "Usuario registrado",
      redirect: "/index",
    });
  }
});

export default router;
