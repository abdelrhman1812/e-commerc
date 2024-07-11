import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import { signIn, signUp, verifyEmail } from "./auth.controller.js";

const authRouter = Router()

/* Sing IN */

authRouter.post('/sign-up', catchError(signUp))

/* Verify Account */

authRouter.get('/verify/:token', catchError(verifyEmail))

/* Sing Up */

authRouter.post('/sign-in', signIn)

export default authRouter