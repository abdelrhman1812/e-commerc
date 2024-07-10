// import jwt from "jsonwebtoken"
// import UserModel from "../../DataBase/models/user.model.js"
// import AppError from "../utils/appError.js"
// import { status } from "../utils/enum.js"
// import messages from "../utils/messages.js"

// const verifyToken = async (req, res, next) => {

//     /* Check If Token Exist   */
//     const { token } = req.headers
//     if (!token) return next(new AppError(messages.token.required), 400)

//     /* Verify Token */
//     const decode = jwt.verify(token, "ody")

//     /* Check if payload  */
//     if (!decode?.userId) return next(new AppError(messages.token.invalidPayload), 400)

//     const authUser = await UserModel.findById(decode.userId)
//     if (!authUser) return next(new AppError(messages.user.userNotFound), 404)

//     /* Check If User Login or no */
//     if (authUser.status == status.OFFLINE) return next(new AppError(messages.user.mustLogin), 401)

//     req.authUser = authUser

//     next()

// }




// export default verifyToken