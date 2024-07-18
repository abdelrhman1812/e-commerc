import { Router } from "express";
import allowedTo from "../../middleware/allowedTo.js";
import catchError from "../../middleware/catchError.js";
import protectedRoute from "../../middleware/protectedRoutes.js";
import validate from "../../middleware/validation.js";
import { roles } from "../../utils/enum.js";
import { signUpValidation } from "../authentication/auth.validation.js";
import { addUser, deleteUser, getUsers, getUserUserData, updateUser } from "./users.controller.js";

const usersRouter = Router();

/**
 * Route to add a new user.
 * @route POST /users
 * @description Route for adding a new user. Requires admin authorization.
 * @access Private
 * @middleware protectedRoute, allowedTo(roles.ADMIN), validate(signUpValidation), catchError(addUser)
 */

usersRouter.post('/', protectedRoute, allowedTo(roles.ADMIN), validate(signUpValidation), catchError(addUser));


/**
* Route to update  user.
 * @route PUT /users/:id
 * @description Route for updating an existing user. Requires admin authorization.
 * @access Private
 * @middleware protectedRoute, allowedTo(roles.ADMIN), catchError(updateUser)
 */

usersRouter.put('/:id', protectedRoute, allowedTo(roles.ADMIN), catchError(updateUser));


/**
 * Route to delete user.
 * @route DELETE /users/:id
 * @description Route for deleting a user by ID. Requires admin authorization.
 * @access Private
 * @middleware protectedRoute, allowedTo(roles.ADMIN), catchError(deleteUser)
 */

usersRouter.delete('/:id', protectedRoute, allowedTo(roles.ADMIN), catchError(deleteUser));
/**
 * Route to get users.
 * @route GET /users
 * @description Route for getting all users. Requires admin authorization.
 * @access Private
 * @middleware protectedRoute, allowedTo(roles.ADMIN), catchError(getUsers)
 */

usersRouter.get('/', protectedRoute, allowedTo(roles.ADMIN), catchError(getUsers));

/**
 * Route to get user date.
 * @route GET /users/:id
 * @description Route for getting a user's data by ID. Requires authentication.
 * @access Private
 * @middleware protectedRoute, catchError(getUserUserData)
 */

usersRouter.get('/:id', protectedRoute, catchError(getUserUserData));


export default usersRouter;
