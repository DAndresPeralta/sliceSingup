import express from "express";
import bcryptjs from "bcryptjs";
const router = express.Router();

import { methods as authentication } from "../utils/users.utils.js";

authentication.initializerFile();

router.post("/register", async (req, res) => {
  //! UTILIZAR TRY/CATCH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const users = authentication.getUsersToFile();
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Campos incompletos" });
  }

  const userCheck = users.find((user) => user.name === name);
  if (userCheck) {
    return res
      .status(400)
      .send({ status: "Error", message: "Usuario registrado previamente" });
  }

  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(password, salt);

  const newUser = {
    id: undefined,
    name,
    email,
    password: hashPassword,
    admin: true,
  };

  newUser.id = parseInt(users.length + 1);
  users.push(newUser);
  authentication.saveUsersToFile(users);

  return res.status(201).send({
    status: "ok",
    message: "Usuario registrado",
    redirect: "/",
  });
});

export default router;
