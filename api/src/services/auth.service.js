import User from '../models/user.model.js';
import Organization from "../models/org.model.js"
import argon from 'argon2';
import { sendNotification } from "../utils/firebase-admin.js"
import { AuthenticationError } from '../utils/AppError.js';

export const registerUser = async ({ username, email, password, role, organization, fcmToken }) => {
    // console.log('Organization: ', organization);

    if (organization === "") {
        // console.log('Organization is empty');
        const org = await Organization.find()
        // console.log(org);
        const hashed = await argon.hash(password);
        const user = new User({
            username,
            email,
            password: hashed,
            role,
            organization: org[0]._id,
            fcmTokens: [fcmToken],
        });
        await user.save();
        await sendNotification(user.fcmTokens, `Welcome ${user.username}`, `Welcome in sapps.site you are registered as a role of ${user.role}. `, user)
        return user;
    }
    const org = new Organization({ name: organization })
    const hashed = await argon.hash(password);
    const user = new User({
        username,
        email,
        password: hashed,
        role,
        organization: org._id,
        fcmTokens: [fcmToken],
    });
    await org.save();
    await user.save();
    await sendNotification(user.fcmTokens,
        `Welcome ${user.username}`,
        `Welcome in sapps.site you are registered as a role of ${user.role}. `,
        user)
    return user;
};

export const loginUser = async (email, password, fcmToken) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AuthenticationError('User not found');
    }

    const isValid = await argon.verify(user.password, password);
    if (!isValid) {
        throw new AuthenticationError('Invalid password');
    }

    if (user.fcmTokens.includes(fcmToken)) {
        console.log("Fcm token exists");
    } else {
        user.fcmTokens = [...user.fcmTokens, fcmToken];
        await user.save();
    }

    await sendNotification(user.fcmTokens,
        `Welcome ${user.username}`,
        `Welcome back Mr. ${user.role}. `,
        user)

    return user;
};

export const getOrg = async ({ _id }) => {
    const org = await Organization.findById({ _id });
    if (!org) {
        throw new Error('Organization not found');
    }
    return org;
}

export const renewOrganisation = async () => {
    const orgMain = await Organization.find();
    // console.log(orgMain[0]);

    if (!orgMain[0]) {
        throw new Error("Organization not found");
    }

    const org = orgMain[0];
    // console.log(org);

    const now = new Date();
    const baseDate = org.premiumExpiresAt > now ? org.premiumExpiresAt : now;

    org.premiumStartedAt = baseDate;
    org.premiumExpiresAt = new Date(baseDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    org.isPremium = true;

    await org.save();
    return org;
};