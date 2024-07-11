import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import UserModel from '../../../database/models/user.model.js'
import AppError from '../../utils/appError.js'
import { status } from '../../utils/enum.js'
import { messages } from '../../utils/messages.js'

/*  ========== Sign Up   ========== */

const signUp = async (req, res, next) => {

    const { name, email, password } = req.body
    /* SEnd Email to Verfiy Account */

    // sendEmails(email)

    /* Check Email Exist */
    const isExist = await UserModel.findOne({ email })

    /* If Exist */

    if (isExist) return next(new AppError(messages.email.isExist), 409)

    /* Hash Password */

    const passwordHashing = bcrypt.hashSync(password, 10)

    /* prepare user */
    const user = new UserModel({
        name,
        email,
        password: passwordHashing
    })
    console.log(user)

    const createdUser = await user.save()
    return res.status(200).json({ message: messages.user.successCreate, user: createdUser, success: true })

}

/*  ========== Verify Email  ========== */

const verifyEmail = async (req, res) => {

    /* Verify Token  - Check Payload */
    jwt.verify(req.params.token, "ody", async (err, payload) => {

        if (err) return next(new AppError(err), 401)

        /* Verfiy Email From False To True */
        await UserModel.findOneAndUpdate({ email: payload.email }, { verifyEmail: true })

        res.json({ message: "Success", email: payload.email })

    })
}


/*  ========== Sign In ========== */

const signIn = async (req, res, next) => {

    const { email, password } = req.body;


    /* Check If User Exist Bu Mobile OR Email  */

    const userExist = await UserModel.findOne({ email });
    if (!userExist) return next(new AppError(messages.email.isNotExist, 404));

    if (!userExist.confirmEmail) return next(new AppError(messages.email.verfiyEmail), 400)
    /* Check Password */

    const matchPassword = bcrypt.compareSync(password, userExist.password);

    if (!matchPassword) return next(new AppError(messages.password.incorrect, 401));

    /* Set Status From offline  to online  */

    userExist.status = status.ONLINE;
    await userExist.save();
    userExist.password = undefined


    /* Generat Token */

    const token = jwt.sign({ userId: userExist._id, name: userExist.username, email: userExist.email },
        "ody", (err, token) => {

            return res.status(200).json({ message: messages.user.login, token, user: userExist });
        }
    )



};




export { signIn, signUp, verifyEmail }

