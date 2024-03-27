import { model, Schema } from "mongoose";
import validator from "validator";

const portfolioSchema = new Schema({
  name: {
    type: String,
    required: [true, "a portfolio must have a name"],
    trim: true,
    minlength: 6,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "a portfolio must have a description"],
    trim: true,
    minlength: 20,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    trim: true,
    lower: true,
    validate: [validator.isURL, "please provide a valide url"],
  },
});
export const Portfolio = model("Portfolio", portfolioSchema);
// export default Portfolio;
