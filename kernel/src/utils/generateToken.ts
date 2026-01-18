import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  isAdmin: boolean;
}

const generateToken = (payload: TokenPayload) => {
  const secret = process.env.JWT_SECRET as string;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
