import { Router } from "express";
import UserController from "../controllers/userController";
import AuthoController from "../controllers/authController";
const { getAllUsers, getUser, updateUser, deleteUser } = UserController;
const { signup, login, protectRoutes, checkAdmin } = AuthoController;
import User from "../models/userModel";
const userRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName,
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the user.
 *         lastName:
 *           type: string
 *           description: The last name of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *         isVerified:
 *           type: boolean
 *           description: Indicates whether the user's email is verified.
 *         isAdmin:
 *           type: boolean
 *           description: Indicates whether the user has administrative privileges.
 */

// Import necessary modules and define the User schema as before...

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of users.
 */
userRouter.route("/").get(protectRoutes, getAllUsers);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve.
 *     responses:
 *       '200':
 *         description: The user object.
 *       '404':
 *         description: No user found with that ID.
 */
userRouter
  .route("/:id")
  .get(protectRoutes, getUser)

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   patch:
   *     summary: Update a user by ID
   *     description: Update a user's details by their ID.
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to update.
   *     responses:
   *       '200':
   *         description: The updated user object.
   *       '404':
   *         description: No user found with that ID.
   */
  .patch(protectRoutes, checkAdmin, updateUser)
  /**
   * @swagger
   * /api/users/v1/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     description: Delete a user by their ID.
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to delete.
   *     responses:
   *       '204':
   *         description: User deleted successfully.
   *       '404':
   *         description: No user found with that ID.
   */
  .delete(protectRoutes, checkAdmin, deleteUser);

export default userRouter;
