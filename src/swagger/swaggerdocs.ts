import BlogDocs from "./blogDocs";
import UserDocs from "./userDocs";
import MessageDocs from "./messageDocs";
const swaggerdocs = {
  openapi: "3.0.1",
  info: {
    title: "My portfolio API documentation",
    version: "1.0.0",
    description: "This is an API for my blog application",
    contact: {
      name: "Jean De Dieu Iradukunda",
      url: "https://JeanIrad.github.io/JeanIrad/",
      email: "jado.milton@gmail.com",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        name: "x-auth-token",
        in: "header",
        description: "Bearer token authorization",
      },
    },
  },
  tags: [
    {
      name: "Blog",
      description: "Blog Endpoints",
    },
    {
      name: "User",
      description: "Users Endpoints",
    },
  ],
  paths: {
    ...UserDocs,
    ...BlogDocs,
    ...MessageDocs,
  },
};
export default swaggerdocs;
