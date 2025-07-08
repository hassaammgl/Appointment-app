import admin from 'firebase-admin';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const messaging = admin.messaging();


export const sendNotification = async (userTokens, title, body) => {
    try {
        const response = await messaging.sendMulticast({
            tokens: userTokens,
            notification: { title, body },
            webpush: {
                headers: {
                    Urgency: 'high'  // For background notifications
                }
            }
        });

        console.log(`${response.successCount} messages sent`);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}