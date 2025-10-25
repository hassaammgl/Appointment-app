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
	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await authservice.login(email, password);

			if (!user) {
				throw new AuthenticationError("Invalid email or password");
			}
			req.session.user = {
				id: user._id?.toString() || "",
				role: user.role,
				email: user.email,
				username: user.username,
				organization: user.organization,
			};

			await new Promise((resolve, reject) => {
				req.session.save((err) => {
					if (err) return reject(err);
					resolve();
				});
			});

			res.json({ message: "Logged in 🛜", user: req.session.user });
		} catch (dbError) {
			handleDbError(dbError);
			next(dbError);
		}
	}
	async logout(req, res, next) {
		try {
			await new Promise((resolve, reject) => {
				req.session.destroy((err) => {
					if (err) return reject(err);
					res.clearCookie("connect.sid");
					resolve();
				});
			});
		} catch (error) {
			console.error(error);
			console.error("Failed to log out");
			next(error);
		}

		res.json({ message: "Logged out 👋" });
	}
}

export const auth = new Auth();
