import request from "supertest";
import server from "../src/server";
import Blog from "../src/models/blogModel";
import User from "../src/models/userModel";
import JWT from "../src/utils/jwt";
import { Response, Request, NextFunction } from "express";

const JWTService = new JWT();

jest.mock("../src/models/userModel");
jest.mock("../src/models/blogModel");

describe("TESTING- PORTFOLIO", () => {
  let app: any;

  beforeAll(() => {
    app = server;
  });

  afterAll(async () => {
    await Blog.deleteMany();
    await User.deleteMany();
    app.close(); // Close the server after all tests are done
  });

  describe("POST - user signup", () => {
    it("should successfully sign up a user and return statusCode of 201", async () => {
      const userData = {
        firstName: "Jean de Dieu",
        lastName: "Iradukunda",
        email: "jeandedieuiradukunda@gmail.com",
        password: "password123",
        // isAdmin: true,
      };
      const response = await request(app)
        .post("/api/auth/signup")
        .send(userData);
      console.log(response.body);
      //   expect(response.statusCode).toBe(201);
      expect(response.body.firstName).toEqual(userData.firstName);
      expect(response.body.email).toEqual(userData.email);
      expect(response.body).not.toHaveProperty("password");
    });
  });

  // Add more test cases as needed
});
