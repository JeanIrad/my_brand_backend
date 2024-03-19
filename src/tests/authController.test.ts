// import Blog from "../models/blogModel";
// import request from "supertest";
// import server from "../server";
// import User from "../models/userModel";
// import JWT from "../utils/jwt";
// const JWTService = new JWT();

// describe("TESTING- PORTFOLIO", () => {
//   beforeEach(() => {
//     server;
//   });
//   afterEach(async () => {
//     server.close();
//     await Blog.deleteMany();
//     // await User.deleteMany();
//   });
//   describe("POST - /api/v1/users/login", () => {
//     it("should return a statusCode of 200 if the credentials provided are correct else 400", async () => {
//       const user = {
//         password: "password123",
//         email: "jeandedieuiradukunda125@gmail.com",
//       };
//       const resp = await request(server).post("/api/v1/users/login").send(user);
//       expect(resp.status).toBe(200);
//       console.log(resp.body);
//     });
//   });
//   describe("POST /api/v1/users/signup", () => {
//     it.skip("should return statusCode of 201", async () => {
//       const newUser = {
//         firstName: "Jean de Dieu",
//         lastName: "Iradukunda",
//         email: "jeandedieuiradukunda@gmail.com",
//         password: "password123",
//       };
//       const response = await request(server)
//         .post("/api/v1/users/signup")
//         .send(newUser);
//       expect(response.statusCode).toBe(201);
//     });
//   });

//   describe(" GET - Blogs", () => {
//     it("should return statuscode of 200", async () => {
//       const blogs = await Blog.insertMany([
//         { title: "first", description: "some text" },
//         { title: "here we go", description: "some desc" },
//       ]);
//       const response = await request(server).get("/api/v1/blogs");
//       expect(response.statusCode).toBe(200);
//     });
//   });
//   describe("POST- /api/v1/blog", () => {
//     it.skip("should return statuscode of 201", async () => {
//       const admin = await User.create({
//         firstName: "jean",
//         lastName: "John",
//         email: "jadomax@gmail.com",
//         password: "password123",
//         isAdmin: true,
//       });
//       const token = JWTService.signToken(admin._id);
//       // const newBlog = await Blog.create()
//       const response = await request(server)
//         .post("/api/v1/blogs")
//         .set("Authorization", `Bearer ${token}`)
//         .send({
//           title: "this is blog1",
//           description: "lorem ipsum dosta",
//           image: "string image",
//         });
//       console.log(response);
//       expect(response.statusCode).toBe(201);
//     });
//   });
// });
