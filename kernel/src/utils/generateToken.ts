import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  isAdmin: boolean;
}

const generateToken = (payload: TokenPayload) => {
  const secret = process.env.JWT_SECRET as string;

  const options: SignOptions = { expiresIn: "7d" };
  return jwt.sign(payload, secret, options);
};

export default generateToken;
