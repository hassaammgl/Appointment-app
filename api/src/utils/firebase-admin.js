import admin from "firebase-admin"
import serviceAccount from "../config/sapps.json"


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});