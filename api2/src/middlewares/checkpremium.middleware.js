import Organization from '../models/org.model.js';
import { AuthorizationError } from '../utils/AppError.js';

export const checkOrgPremium = async (req, res, next) => {
  const user = req.session?.user;
  if (!user) throw new AuthorizationError('Login required');

  const org = await Organization.findById({ _id: user.organization });

  org.updatePremiumStatus();
  await org.save();

  if (!org.isPremium) {
    throw new AuthorizationError('Your organization’s premium access expired. Please renew 💳');
  }

  next();
};
