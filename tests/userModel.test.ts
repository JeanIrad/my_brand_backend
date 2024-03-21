import mongoose from "mongoose";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import validator from "validator";
import { UserDocument } from "../src/models/userModel";
config({ path: `${process.cwd()}/src/env/config.env` });

describe.skip("User Model", () => {
  let User: mongoose.Model<UserDocument>;

  beforeAll(async () => {
    // Connect to a test database or mock mongoose
    await mongoose.connect(process.env.DB_LOCAL_TEST!);

    // Import the User model after connecting to the database
    User = require("../src/models/userModel").default;
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  it("should hash the password before saving", async () => {
    // Create a new user instance
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    const user = new User(userData);

    // Save the user to trigger the pre-save hook
    await user.save();

    // Check if the password has been hashed
    expect(user.password).not.toBe(userData.password);

    // Check if the hashed password is a valid bcrypt hash
    const isPasswordValid = await bcrypt.compare(
      userData.password,
      user.password
    );
    expect(isPasswordValid).toBe(true);
  });

  // Add more test cases as needed
});
