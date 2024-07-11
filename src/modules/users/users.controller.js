import bcrypt from 'bcrypt';
import UserModel from "../../../DataBase/models/user.model.js";
import AppError from "../../utils/appError.js";
import messages from "../../utils/messages.js";



/*  ========== Update Account ========== */
const updateAccount = async (req, res, next) => {
    const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body;
    const userId = req.authUser._id



    /* Find And Check if email or mobile  conflic or no */
    const conflictUser = await UserModel.findOne({
        $or: [
            { email },
            { mobileNumber }
        ],
        _id: { $ne: userId }
    });

    if (conflictUser) return next(new AppError(messages.user.conflict, 409));



    /* Find And Update Update */

    const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        req.body,
        { new: true }
    );

    if (!updatedUser) return next(new AppError(messages.user.userNotFound, 404));


    return res.status(200).json({ message: messages.user.updateUser, user: updatedUser, success: true });
};



/*  ========== Delete User ========== */

const deleteAccount = async (req, res, next) => {
    /* Get Id form Auth */

    const userId = req.authUser._id

    /* Find And Delete */

    await UserModel.findByIdAndDelete(userId)

    return res.status(200).json({ message: messages.user.deleted, success: true });

}

/*  ========== Get User Account Data  ========== */

const getUserAccountData = async (req, res, next) => {

    const userId = req.authUser._id
    const user = await UserModel.findById(userId);
    res.status(200).json({ message: messages.user.successfully, data: user })

}

/*  ========== Get profile data for another user   ========== */

const getProfileDataForAnotherUser = async (req, res, next) => {

    const userId = req.query.userId

    const user = await UserModel.findById(userId);

    res.status(200).json({ message: messages.user.successfully, data: user })

}

/*  ==========  Update password    ========== */

const updatePassword = async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;

    const user = req.authUser;

    /* check Old Password By New Password */

    const matchPassword = bcrypt.compareSync(oldPassword, user.password);

    if (!matchPassword) return next(new AppError(messages.user.incorrectOldPassword, 401));

    /* Hash New Password */

    const hashNewPassword = bcrypt.hashSync(newPassword, 10)

    /* Update Password */

    await UserModel.findByIdAndUpdate(user._id, { password: hashNewPassword });

    return res.status(200).json({ message: messages.user.successUpdatePassword });
};


/* ========== Get all accounts associated to a specific recovery Email ==========  */

const getUsersByRecoveryEmail = async (req, res, next) => {
    const { recoveryEmail } = req.params;
    const users = await UserModel.find({ recoveryEmail });

    /* Check the return !== 0 */
    if (!users || users.length === 0) {
        return next(new AppError(messages.user.notFound, 404));
    }
    res.status(200).json({ message: messages.user.successfully, data: users });

}
export {
    deleteAccount,
    getProfileDataForAnotherUser,
    getUserAccountData, getUsersByRecoveryEmail, updateAccount,
    updatePassword
};

