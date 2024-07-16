import fs from "fs";
const path = "users.json";

const initializerFile = () => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
};

const getUsersToFile = () => {
  const data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
};

const saveUsersToFile = (users) => {
  fs.writeFileSync(path, JSON.stringify(users, null, 2));
  return;
};

export const methods = {
  initializerFile,
  saveUsersToFile,
  getUsersToFile,
};
