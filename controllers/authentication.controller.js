import bcryptjs from "bcryptjs";
import fs from "fs";

export const users = [];

class userManager {
  constructor(filePath) {
    this.path = filePath;
    this.initializerFile();
  }
  initializerFile() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }
  addUser(user) {
    users.push(user);
    this.saveUsersToFile(users);
  }
  saveUsersToFile(users) {
    fs.writeFileSync(this.path, JSON.stringify(users, null, 2));
    return;
  }
}

async function login(req, res) {}

async function register(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Verificación. Campos completos
  if (!name || !email || !password) {
    return res
      .status(400)
      .send({ status: "Error", message: "Campos incompletos" });
  }

  // Verificacion. Usuario repetido.
  // Buscamos el usuario.
  const userCheck = users.find((user) => user.name === name);
  if (userCheck) {
    return res
      .status(400)
      .send({ status: "Error", message: "Usuario registrado previamente" });
  }

  // Aca encriptamos la contraseña que ponga el usuario. Son metodos asincronicos.
  const salt = await bcryptjs.genSalt(5);
  const hashPassword = await bcryptjs.hash(password, salt);

  const newUser = {
    name,
    email,
    password: hashPassword,
  };

  const u = new userManager("users.json");
  u.addUser(newUser);

  return res.status(201).send({
    status: "ok",
    message: "Usuario registrado",
    redirect: "/",
  });
}

// Forma para exportar funciones/métodos, etc.
export const methods = {
  login,
  register,
};

// $2a$05$X/fRxNMDxqTzwXbOYA5qO.nZUydayCY0gNveDf43HrrxYWdxYe8im
