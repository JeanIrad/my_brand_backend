import request from "supertest";
import server from "../src/server";
import Blog from "../src/models/blogModel";
import { Response, Request, NextFunction } from "express";

describe("GET /api/blogs", () => {
  let app: any;

  beforeAll(() => {
    app = server;
  });

  afterAll(async () => {
    await Blog.deleteMany();
    app.close();
  });

  it("should return all blogs with status 200", async () => {
    // Add some mock blogs to the database for testing
    await Blog.create([
      {
        title: "Blog 1",
        description: "Content 1 this is a test",
        author: "65ef2abc1e69678b2737c06b",
      },
      {
        title: "Blog 2",
        description: "Content 2 another test is here",
        author: "65ef2abc1e69678b2737c06b",
      },
    ]);

    const response = await request(app).get("/api/blogs").send();

    // Assert that the response status is 200
    expect(response.status).toBe(200);

    expect(response.body.status).toBe("success");
    expect(response.body.data).toHaveLength(2);
  });
  describe("GET /api/blogs/:id", () => {
    it("should return a blog with status 200", async () => {
      const mockBlog = await Blog.create({
        title: "Test Blog",
        description: "Test Content here we go",
        author: "65ef2abc1e69678b2737c06b",
      });
      const response = await request(app)
        .get(`/api/blogs/${mockBlog._id}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.blog.title).toBe(mockBlog.title);
      expect(response.body.blog.description).toBe(mockBlog.description);
    });
  });
  describe("GET /api/blogs/:id", () => {
    it("should return a blog with status 200", async () => {
      // Send a GET request to retrieve the blog by its ID
      const mockBlog = await Blog.create({
        title: "Test Blog",
        description: "Test Content ajhsd",
        // author: "65ef2abc1e69678b2737c06b",
      });
      const response = await request(app)
        .get(`/api/blogs/${mockBlog._id}`)
        .send();

      // Assert that the response status is 200
      expect(response.status).toBe(200);

      // Assert that the response body contains the correct data
      expect(response.body.status).toBe("success");
      expect(response.body.blog.title).toBe(mockBlog.title);
      expect(response.body.blog.description).toBe(mockBlog.description);
    });
    // ObjectId castError Handling
    it("should return 404 if blog ID is invalid", async () => {
      // Send a GET request with an invalid blog ID
      const response = await request(app).get("/api/blogs/invalid_id").send();

      expect(response.status).toBe(404);

      // Assert that the response body contains the correct error message
      expect(response.body.message).toBe("Invalid _id: invalid_id.");
    });
    // invalid blog id provided
    describe("given a correct id but not of any blog", () => {
      it("should return 404", async () => {
        const uknownId = "65ef2abc1e69678b2737c06b";
        const response = await request(app).get(`/api/blogs/${uknownId}`);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("PATCH /api/blogs/:id", () => {
    describe("given that you are not logged in", () => {
      it("should return statuscode of 401", async () => {
        // Create a mock blog in the database
        const mockBlog = await Blog.create({
          title: "Test Blog",
          description: "Test Content",
          author: "65ef2abc1e69678b2737c06b",
        });

        const updatedData = {
          title: "Updated Test Blog",
          description: "Updated Test Content",
        };

        const response = await request(app)
          .patch(`/api/blogs/${mockBlog._id}`)
          .send(updatedData);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
          message: "you are not authorized, sign up!",
        });
      });
    });
  });
});
