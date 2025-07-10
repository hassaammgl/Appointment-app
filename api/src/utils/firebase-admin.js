import admin from 'firebase-admin';
import serviceAccount from '../config/sapps.json';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const messaging = admin.messaging();

export const sendNotification = async (userTokens, title, body, user) => {
    try {
        const response = await messaging.sendMulticast({
            tokens: userTokens,
            notification: { title, body },
            webpush: {
                headers: {
                    Urgency: 'high',
                },
            },
        });

        console.log(`✅ ${response.successCount} / ${userTokens.length} messages sent`);

        // 🔥 Cleanup invalid tokens
        const invalidTokens = [];
        response.responses.forEach((resp, idx) => {
            if (!resp.success) {
                const err = resp.error;
                console.warn(`❌ Token error at [${idx}]: ${err.message}`);
                if (
                    err.code === 'messaging/invalid-registration-token' ||
                    err.code === 'messaging/registration-token-not-registered'
                ) {
                    invalidTokens.push(userTokens[idx]);
                }
            }
        });

        if (invalidTokens.length > 0) {
            user.fcmTokens = user.fcmTokens.filter(t => !invalidTokens.includes(t));
            await user.save();
            console.log(`🧹 Removed ${invalidTokens.length} invalid tokens from DB`);
        }
    } catch (error) {
        console.error('🔥 Fatal error while sending messages:', error.message);
    }
};
