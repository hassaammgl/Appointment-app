import { ENVS } from "./constants.js";
import { logger } from "./logger.js";
import { envSchema } from "../validations/env.schema.js";

export const checkEnv = () => {
	if (ENVS.DEBUG === "true") {
		logger.debug("Environment variables:");
		for (const [key, value] of Object.entries(ENVS)) {
			logger.debug(
				`  ${key} => ${value !== undefined ? value : "undefined"}`
			);
		}
	}

	const { error, value } = envSchema.validate(ENVS, {
		abortEarly: false,
		convert: true,
	});

	if (error) {
		const errors = error.details.map((d) => `  • ${d.message}`).join("\n");
		const fullError = `\nEnvironment validation failed:\n${errors}\n`;

		logger.error(fullError);
		throw new Error(fullError);
	}

	Object.assign(ENVS, value);

	logger.info("Environment variables validated successfully");
	return true;
};
