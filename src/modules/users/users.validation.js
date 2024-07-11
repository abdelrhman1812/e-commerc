import Joi from "joi";

const updateUserValidation = Joi.object({
    firstName: Joi.string().min(3).max(12).required(),
    lastName: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    recoveryEmail: Joi.string().email().required(),
    dob: Joi.string().required(),
    mobileNumber: Joi.string().required()
});

const updatePasswordValidation = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/).required()
});

export { updatePasswordValidation, updateUserValidation };
