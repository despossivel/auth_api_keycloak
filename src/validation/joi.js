import Joi from 'joi';

export const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    enabled: Joi.string().required()
});

 
export const updateSchema = Joi.object({
    attributes: Joi.object().required()
});
 

export const resetPasswordSchema = Joi.object({
    value: Joi.string().required()
});
