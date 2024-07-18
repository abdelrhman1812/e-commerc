import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import UserModel from '../../../database/models/user.model.js'
import AppError from '../../utils/appError.js'
import { status } from '../../utils/enum.js'
import { messages } from '../../utils/messages.js'


/**
 *  user registration.
 * @param {Object} req - The request object containing user registration data.
 * @param {Object} req.body - The request body containing user details.
 * @param {string} req.body.email - The email of the user to register.
 * @param {string} req.body.password - The password of the user to register.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */

const signUp = async (req, res, next) => {

    const { email } = req.body
    // sendEmails(email)
    const isExist = await UserModel.findOne({ email })
    if (isExist) return next(new AppError(messages.email.isExist, 409))
    const user = new UserModel(req.body)
    const createdUser = await user.save()
    return res.status(200).json({ message: messages.user.successCreate, user: createdUser, success: true })

}

/**
 * Verifies user email based on the token provided.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */

const verifyEmail = async (req, res) => {

    jwt.verify(req.params.token, "ody", async (err, payload) => {

        if (err) return next(new AppError(err, 401))
        await UserModel.findOneAndUpdate({ email: payload.email }, { verifyEmail: true })
        res.json({ message: messages.user.success, email: payload.email })

    })
}


/**
 *  user sign-in.
 * @param {Object} req - The request object containing user sign-in data.
 * @param {string} req.body.email - The email of the user signing in.
 * @param {string} req.body.password - The password of the user signing in.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 */

const signIn = async (req, res, next) => {
    let { email } = req.body;

    let userExist = await UserModel.findOne({ email });
    if (!userExist) return next(new AppError(messages.email.isNotExist, 404));

    let matchPassword = bcrypt.compareSync(req.body.password, userExist.password);
    if (!matchPassword) { return next(new AppError(messages.password.incorrect)); }
    if (!userExist.confirmEmail) return next(new AppError(messages.email.verifyEmail, 401));

    await UserModel.updateOne({ _id: userExist._id }, { status: status.ONLINE });
    userExist.password = undefined;

    const token = jwt.sign(
        { userId: userExist._id, name: userExist.username, email: userExist.email },
        process.env.JWT_SECRET || "ody",
        // { expiresIn: '1h' }, 
        (err, token) => {
            if (err) return next(new AppError("Token generation failed", 500));
            return res.status(200).json({ message: messages.user.login, token, user: userExist });
        }
    );


};




export { signIn, signUp, verifyEmail }

