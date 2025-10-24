// validation/envSchema.js
import Joi from "joi";

export const envSchema = Joi.object({
	PORT: Joi.number()
		.default(5000)
		.messages({ "number.base": "PORT must be a number" }),

	MONGO_URI: Joi.string()
		.uri({ scheme: ["mongodb", "mongodb+srv"] })
		.required()
		.messages({
			"string.uri": "MONGO_URI must be a valid MongoDB connection string",
			"any.required": "MONGO_URI is required",
		}),

	CLIENT_ORIGIN: Joi.string()
		.uri({ scheme: ["http", "https"] })
		.required()
		.messages({
			"string.uri":
				"CLIENT_ORIGIN must be a valid URL (e.g. http://localhost:3000)",
			"any.required": "CLIENT_ORIGIN is required",
		}),

	NODE_ENV: Joi.string()
		.valid("development", "production", "test")
		.default("development"),

	DEVELOPER_SECRET: Joi.string().min(32).required().messages({
		"string.min": "DEVELOPER_SECRET must be at least 32 characters",
		"any.required": "DEVELOPER_SECRET is required",
	}),

	SESSION_SECRET: Joi.string().min(32).required().messages({
		"string.min": "SESSION_SECRET must be at least 32 characters",
		"any.required": "SESSION_SECRET is required",
	}),

	DEBUG: Joi.string().valid("true", "false").default("false"),
})
	.unknown(false) // Disallow unknown keys
	.required();
