import admin from 'firebase-admin';
import fs from 'fs';
const serviceAccount = JSON.parse(
    fs.readFileSync(new URL('../config/sapps.json', import.meta.url), 'utf-8')
);


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const messaging = admin.messaging();

export const sendNotification = async (userTokens, title, body, user) => {
    try {
        const response = await messaging.sendEachForMulticast({
            tokens: userTokens,
            notification: { title, body },
            webpush: {
                headers: {
                    Urgency: 'high',
                },
            },
            apns: { // For iOS specific options
                payload: {
                    aps: {
                        badge: 1,
                        sound: 'default'
                    }
                }
            },
            android: { // For Android specific options
                priority: 'high',
                notification: {
                    channelId: 'my_channel_id',
                    sound: 'default'
                }
            },
        });

        console.log(`✅ ${response.successCount} / ${userTokens.length} messages sent`);

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
