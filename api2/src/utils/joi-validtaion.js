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
            }),

        organization: Joi.when('role', {
            is: 'ceo',
            then: Joi.string().required().messages({
                'string.empty': 'Organization is required for CEO'
            }),
            otherwise: Joi.string().allow('').optional()
        }),
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
            }),
    });

    return loginValidate.validate(body, { abortEarly: false });
}

export const validateReqMeeting = (body) => {
    const reqMeetingSchema = Joi.object({
        visitorName: Joi.string()
            .required()
            .messages({
                'string.empty': 'Visitor name is required',
            }),
        visitorNo: Joi.string()
            .pattern(/^\d{4}-\d{7}$/)
            .allow('', null)
            .messages({
                'string.empty': 'Visitor number is required',
                'string.pattern.base': 'Visitor number must be numeric',
            }),
        visitorCnic: Joi.string()
            .pattern(/^\d{5}-\d{7}-\d{1}$/)
            .allow('', null)
            .messages({
                'string.empty': 'CNIC is required',
                'string.pattern.base': 'CNIC must be in the format 12345-1234567-1',
            }),
        purpose: Joi.string()
            .allow('', null)
            .messages({
                'string.empty': 'Purpose is required',
            }),
        createdBy: Joi.string()
            .required()
            .messages({
                'string.empty': 'Created by field is required',
            }),
        notes: Joi.string()
            .allow('', null)
            .messages({
                'string.base': 'Notes must be a string',
            }),
        to: Joi.string()
            .required()
            .messages({
                'string.empty': '{to} field is required',
            }),
    });

    return reqMeetingSchema.validate(body, { abortEarly: false });
};

export const validateCancelReq = (body) => {
    const cancelReqSchema = Joi.object({
        _id: Joi.string()
            .required()
            .max(24)
            .messages({
                'string.empty': 'Request id is required',
            }),
    });

    return cancelReqSchema.validate(body, { abortEarly: false });
};

export const validateApproveAndRej = (body) => {
    const approveAndRejSchema = Joi.object({
        _id: Joi.string()
            .required()
            .max(24)
            .messages({
                'string.empty': 'Request id is required',
            }),
    });

    return approveAndRejSchema.validate(body, { abortEarly: false });
};

export const validateUpdatePriority = (body) => {
    const validateUpdatePrioritySchema = Joi.object({
        _id: Joi.string()
            .required()
            .max(24)
            .messages({
                'string.empty': 'Request id is required',
            }),
        value: Joi.number()
            .required()
            .messages({
                'number.empty': 'Priority value is required',
            }),
    });

    return validateUpdatePrioritySchema.validate(body, { abortEarly: false });
};

export const validateGetReqsByRole = (body) => {
    const validateUpdatePrioritySchema = Joi.object({
        _id: Joi.string()
            .required()
            .messages({
                'string.empty': 'Request id is required',
            }),
    });

    return validateUpdatePrioritySchema.validate(body, { abortEarly: false });
};
