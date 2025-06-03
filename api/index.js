import { connectDB } from './src/config/db.js';
import app from './src/app.js';
import { CONSTANTS } from './src/utils/constants.js';

console.time("connecting db")
await connectDB().then(() => {
    console.log("✅ MongoDB connected");
    console.timeEnd("connecting db")
});

const PORT = CONSTANTS.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('API running on port 5000');
});