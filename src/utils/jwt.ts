import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
dotenv.config({ path: "../env/config.env" });
export default class JWT {
  constructor(
    private secret: string = process.env.JWT_SECRET_KEY!,
    private expireDate: string = process.env.JWT_EXPIRATION_DATE!
  ) {}
  signToken = (id: ObjectId) => {
    return jwt.sign({ id }, this.secret, {
      expiresIn: this.expireDate,
    });
  };
  verifyToken = (token: string, secret: string = process.env.SECRET_KEY!) => {
    return jwt.verify(token, secret);
  };
}
