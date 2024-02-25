import bcrypt from "bcryptjs";

export const encryptedPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    return secPass;
  } catch (error) {
    return null;
  }
};
const decryptedPassword = (
  password: string,
  hash: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

export const checkPassword = async (password: string, hash: string) => {
  try {
    const isMatch = await decryptedPassword(password, hash);
    if (!isMatch) {
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
