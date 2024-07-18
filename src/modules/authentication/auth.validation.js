import Joi from "joi";

/**
 * Validation schema for user sign-up.
 */

const signUpValidation = Joi.object({
    name: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/).required(),
});


/**
 * Validation schema for user sign-in.
 */

const signInValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{3,40}$/).required()
});

export { signInValidation, signUpValidation };

