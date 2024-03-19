import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: `${__dirname}/env/config.env` });

import app from "./index";

const PORT = process.env.PORT || 6000;
const DB_LOCAL: string = process.env.DB_LOCAL!;
const DB_LOCAL_TEST: string = process.env.DB_LOCAL_TEST!;
const DB: string = process.env.DB!;

mongoose
  .connect(DB)
  .then(() => console.log("DB connected!"))
  .catch((e) => console.log("error!", e));

const server = app.listen(PORT, () =>
  console.log(`app running on port ${PORT}... `)
);
console.log(process.env.NODE_ENV);
export default server;
