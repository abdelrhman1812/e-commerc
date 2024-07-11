import Joi from "joi";

const signupValidation = Joi.object({
    firstName: Joi.string().min(3).max(12).required(),
    lastName: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    recoveryEmail: Joi.string().email().required(),
    dob: Joi.string().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/).required(),
    mobileNumber: Joi.string().required()
});

const signinValidation = Joi.object({
    emailOrMobile: Joi.string().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/).required()
});

export { signinValidation, signupValidation };
