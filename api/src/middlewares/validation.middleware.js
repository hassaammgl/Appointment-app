import { AppError } from "../utils/AppError.js";

export const validateRequest = (schema, isUrl = false) => {
	return (req, _, next) => {
		const dataToValidate = isUrl ? req.params : req.body;
		const { error } = schema.validate(dataToValidate, {
			abortEarly: false,
		});

		if (error?.details?.length) {
			const message = error.details
				.map((detail) => detail.message)
				.join(", ");
			throw new AppError(message, 400);
		}

		next();
	};
};
