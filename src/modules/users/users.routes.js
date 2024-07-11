import { Router } from "express";
import catchError from "../../middleware/catchError.js";
import verifyToken from "../../middleware/verifyToken.js";
import { deleteAccount, getProfileDataForAnotherUser, getUserAccountData, getUsersByRecoveryEmail, updateAccount, updatePassword } from "./users.controller.js";

import validate from "../../middleware/validation.js";
import { updatePasswordValidation, updateUserValidation } from "./users.validation.js";


const userRouter = Router()

userRouter.put('/', verifyToken, validate(updateUserValidation), catchError(updateAccount))

userRouter.delete('/', verifyToken, catchError(deleteAccount))

/* Get User Account Data */

userRouter.get('/', verifyToken, catchError(getUserAccountData))

/*  ========== Get profile data for another user   ========== */

userRouter.get('/profile', verifyToken, catchError(getProfileDataForAnotherUser))

/*  ==========  Update password    ========== */

userRouter.put('/update-password', verifyToken, validate(updatePasswordValidation), catchError(updatePassword))

userRouter.get('/:recoveryEmail', getUsersByRecoveryEmail);


export default userRouter