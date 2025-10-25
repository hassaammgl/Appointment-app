import Organization from "../models/org.model.js";
import { AuthorizationError } from "../utils/AppError.js";

export const checkOrgPremium = async (req, _, next) => {
	const user = req.session?.user;
	if (!user) {
		throw new AuthorizationError("Login required");
	}

	const org = await Organization.findById(user.organization);
	if (!org) {
		throw new AuthorizationError("Organization not found");
	}

	org.updatePremiumStatus();
	await org.save();

	if (!org.isPremium) {
		throw new AuthorizationError(
			"Your organization's premium access expired. Please renew 💳"
		);
	}

	next();
};
