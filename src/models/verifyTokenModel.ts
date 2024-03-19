import { model, Schema } from "mongoose";

const VerifyToken = model(
  "VerifyToken",
  new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
      expires: "10m",
    },
  })
);
export default VerifyToken;
