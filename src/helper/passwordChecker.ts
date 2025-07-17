import bycrpt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRound = 10;
  const salt = await bycrpt.genSalt(saltRound);
  const hashedpassword = await bycrpt.hash(password, salt);
  return hashedpassword;
};

export const comparePassword = async (
  existingPassword: string,
  inputPassword: string
): Promise<boolean> => {
  return bycrpt.compare(existingPassword, inputPassword);
};
