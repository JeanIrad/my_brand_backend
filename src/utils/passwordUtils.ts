import bcrypt from "bcrypt";

const checkLoginPassword = async (loginPass: string, currentPass: string) => {
  return await bcrypt.compare(loginPass, currentPass);
};
