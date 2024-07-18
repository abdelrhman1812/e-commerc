import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import validate from "../../middleware/validation.js";
import { signIn, signUp, verifyEmail } from "./auth.controller.js";
import { signInValidation, signUpValidation } from "./auth.validation.js";

const authRouter = Router();

/**
 * Route for user (Sign Up).
 * @route POST /auth/sign-up
 * @description Route for registering a new user.
 * @access Public
 * @middleware validate(signUpValidation), catchError(signUp)
 */

authRouter.post('/sign-up', validate(signUpValidation), catchError(signUp));

/**
 * Route for verifying user email.
 * @route GET /auth/verify/:token
 * @description Route for verifying user email using a verification token.
 * @access Public
 * @middleware catchError(verifyEmail)
 */

authRouter.get('/verify/:token', catchError(verifyEmail));

/**
 * Route for user (Sign In).
 * @route POST /auth/sign-in
 * @description Route for user authentication.
 * @access Public
 * @middleware validate(signInValidation), catchError(signIn)
 */

authRouter.post('/sign-in', validate(signInValidation), catchError(signIn));

export default authRouter;
