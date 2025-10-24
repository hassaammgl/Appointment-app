import { authservice } from "../services/auth.service.js";
import StatusCode from "http-status-codes";
import { handleDbError } from "../utils/handleDbError.js";

class Auth {
	async register(req, res, next) {
		try {
			const user = await authservice.register(req.body);
			res.status(StatusCode.CREATED).json({
				message: "User created 🎉",
				user,
			});
		} catch (error) {
			handleDbError(error);
			next(error);
		}
	}
	async login(req, res, next) {}
	async logout(req, res, next) {}
}

export const auth = new Auth();
