import User from '../models/user.model.js';
import Organization from "../models/org.model.js"
import argon from 'argon2';

export const registerUser = async ({ username, email, password, role, organization }) => {
    console.log('Organization: ', organization);

    if (organization === "") {
        console.log('Organization is empty');
        const org = await Organization.find()
        console.log(org);
        const hashed = await argon.hash(password);
        const user = new User({ username, email, password: hashed, role, organization: org[0]._id });
        return await user.save();
    }
    const org = new Organization({ name: organization })
    const hashed = await argon.hash(password);
    const user = new User({ username, email, password: hashed, role, organization: org._id });
    await org.save();
    return await user.save();
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await argon.verify(user.password, password))) return null;
    return user;
};

export const getOrg = async ({ _id }) => {
    const org = await Organization.findById({ _id });
    if (!org) {
        throw new Error('Organization not found');
    }
    console.log(org);
    return org;
}

export const renewOrganisation = async () => {
  const org = await Organization.find()[0];
  if (!org) {
    throw new Error("Organization not found");
  }

  const now = new Date();
  const baseDate = org.premiumExpiresAt > now ? org.premiumExpiresAt : now;

  org.premiumStartedAt = baseDate;
  org.premiumExpiresAt = new Date(baseDate.getTime() + 365 * 24 * 60 * 60 * 1000);
  org.isPremium = true;

  await org.save();
  return org;
};