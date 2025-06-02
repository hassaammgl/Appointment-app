import { connectDB } from './src/config/db.js';
import app from './src/app.js';
import { CONSTANTS } from './src/utils/constants.js';

console.time("connecting db")
await connectDB();
console.timeEnd("connecting db")

const PORT = CONSTANTS.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
