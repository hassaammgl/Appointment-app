import Joi from "joi"

export const validateRegister = (body) => {
    const regValidate = Joi.object({
        username: Joi.string()
            .required()
            .min(3)
            .max(30)
            .trim()
            .messages({
                'string.empty': 'Username is required',
                'string.min': 'Username must be at least 3 characters long',
                'string.max': 'Username cannot exceed 30 characters'
            }),

        email: Joi.string()
            .required()
            .email()
            .trim()
            .lowercase()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please enter a valid email address'
            }),

        password: Joi.string()
            .required()
            .min(8)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'))
            .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            }),

        role: Joi.string()
            .required()
            .valid('receptionist', 'ceo', 'cto', 'cfo', 'gm')
            .messages({
                'string.empty': 'Role is required',
                'any.only': 'Role must be one of: receptionist, ceo, cto, cfo, or gm'
            })
    });

    return regValidate.validate(body, { abortEarly: false });
}

export const validateLogin = (body) => {
    const loginValidate = Joi.object({
        email: Joi.string()
            .required()
            .email()
            .trim()
            .lowercase()
            .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please enter a valid email address'
            }),

        password: Joi.string()
            .required()
            .messages({
                'string.empty': 'Password is required'
            })
    });

    return loginValidate.validate(body, { abortEarly: false });
}