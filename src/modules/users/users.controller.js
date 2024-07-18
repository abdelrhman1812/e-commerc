
import UserModel from "../../../database/models/user.model.js"
import AppError from "../../utils/appError.js"
import { messages } from "../../utils/messages.js"


/**
 * Add a new user .
 * @param {Object} req - The request object contain user fields.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object contain user.
 * @param {function} next - The next middleware function.
 */

const addUser = async (req, res, next) => {
    const { name, email, password } = req.body
    /* Check Email Exist */
    const isExist = await UserModel.findOne({ email })
    /* If Exist */
    if (isExist) return next(new AppError(messages.email.isExist, 409))
    /* prepare user */
    const user = new UserModel({
        name,
        email,
        password
    })
    const createdUser = await user.save()
    return res.status(200).json({ message: messages.user.successCreate, user: createdUser, success: true })
}

/**
 * Updates an existing user.
 * @param {Object} req - The request object contain user fields.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} req.body - The request body " any field user need to update ".
 * @param {string} [req.body.email] - The new email of the user or old.
 * @param {Object} res - The response object contain user data.
 * @param {function} next - The next middleware function.
 */

const updateUser = async (req, res, next) => {
    const userId = req.params.id
    const { email } = req.body;
    /* Check if exist */
    const user = await UserModel.findById(userId)
    if (!user) return next(new AppError(messages.user.notFound, 404));
    /* Find And Check if email or mobile  conflict or no */
    const conflictUser = await UserModel.findOne({ email, _id: { $ne: userId } });
    if (conflictUser) return next(new AppError(messages.email.conflictEmail, 409));
    /* Find And Update Update */
    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        req.body,
        { new: true }
    );
    return res.status(200).json({ message: messages.user.updateUser, user: updatedUser, success: true });
};


/**
 * Get all users from .
 * @param {Object} req - The request object.
 * @param {Object} res - The response contain message success.
 * @param {function} next - The next middleware function.
 */

const getUsers = async (req, res, next) => {
    const users = await UserModel.find();
    res.status(200).json({ message: messages.user.success, success: true, users })
}


/**
 * Get a specific user by ID .
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the user .
 * @param {Object} res - The response contain message success.
 * @param {function} next - The next middleware function.
 */

const getUserUserData = async (req, res, next) => {
    const userId = req.params.id
    const user = await UserModel.findById(userId);
    if (!user) return next(new AppError(messages.user.notFound, 404))
    res.status(200).json({ message: messages.user.success, user })

}


/**
 * Deletes a specific user by ID from the database.
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the user to delete.
 * @param {Object} res - The response contain message success delete.
 * @param {function} next - The next middleware function.
 */

const deleteUser = async (req, res, next) => {
    const userId = req.params.id
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) return next(new AppError(messages.user.notFound, 404))
    res.status(200).json({ message: messages.user.successDelete })
}

export { addUser, deleteUser, getUsers, getUserUserData, updateUser }




