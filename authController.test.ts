// import Blog from "../src/models/blogModel";
// import request from "supertest";
// import server from "../src/server";
// import User from "../src/models/userModel";
// import JWT from "../src/utils/jwt";
// import { Response, Request, NextFunction } from "express";

// const JWTService = new JWT();

// jest.mock("../src/models/userModel");
// jest.mock("../src/models/blogModel");

// describe("TESTING- PORTFOLIO", () => {
//   beforeEach(() => {
//     server;
//   });
//   afterEach(async () => {
//     server.close();
//     await Blog.deleteMany();
//     // await User.deleteMany();
//   });
//   //   describe("POST - /api/auth/login", () => {
//   //     it.skip("should return a statusCode of 200 if the credentials provided are correct else 400", async () => {
//   //       const user = {
//   //         password: "password123",
//   //         email: "jeandedieuiradukunda125@gmail.com",
//   //       };
//   //       const mockRequest = {
//   //         body: {
//   //           password: "password123",
//   //           email: "jeandedieuiradukunda125@gmail.com",
//   //         },
//   //       } as Request;
//   //       const resp = await request(server).post("/api/v1/users/login").send(user);
//   //       expect(resp.status).toBe(200);
//   //       console.log(resp.body);
//   //     });
//   //   });
//   describe("POST - user signup", () => {
//     it("should successfully sign up a user and return statusCode of 201", async () => {
//       const userData = {
//         firstName: "Jean de Dieu",
//         lastName: "Iradukunda",
//         email: "jeandedieuiradukunda@gmail.com",
//         password: "password123",
//         isAdmin: true,
//       };
//       const response = await request(server)
//         .post("/api/auth/signup")
//         .send(userData)
//         .expect(201);
//       expect(response.statusCode).toBe(201);
//       expect(response.body.firstName).toEqual(userData.firstName);
//       expect(response.body.email).toEqual(userData.email);
//       expect(response.body).not.toHaveProperty("password");
//     });
//   });

//   //   describe(" GET - Blogs", () => {
//   //     it("should return statuscode of 200", async () => {
//   //       const blogs = await Blog.insertMany([
//   //         {
//   //           title: "first",
//   //           description: "some text these texts should exceed 199",
//   //         },
//   //         {
//   //           title: "here we go",
//   //           description: "some desc these texts should exceed 199",
//   //         },
//   //       ]);
//   //       const response = await request(server).get("/api/blogs");
//   //       expect(response.statusCode).toBe(200);
//   //     });
//   //   });
//   //   describe("POST- /api/blog", () => {
//   //     it.skip("should return statuscode of 201", async () => {
//   //       const admin = await User.create({
//   //         firstName: "jean",
//   //         lastName: "John",
//   //         email: "jadomax@gmail.com",
//   //         password: "password123",
//   //         isAdmin: true,
//   //       });
//   //       const token = JWTService.signToken(admin._id);
//   //       // const newBlog = await Blog.create()
//   //       const response = await request(server)
//   //         .post("/api/blogs")
//   //         .set("Authorization", `Bearer ${token}`)
//   //         .send({
//   //           title: "this is blog1",
//   //           description: "lorem ipsum dosta",
//   //           image: "string image",
//   //         });
//   //       console.log(response);
//   //       expect(response.statusCode).toBe(201);
//   //     });
//   //   });
// });
