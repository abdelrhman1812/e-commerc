import AppError from "../utils/appError.js";
import { messages } from "../utils/messages.js";

const auth = (role) => {
    return (req, res, next) => {
        const userRole = req.authUser.role;

        if (role.includes(userRole)) {
            next();
        } else {
            next(new AppError(messages.user.notAuthorized));

        }
    };
}


export default auth




