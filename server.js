import 'dotenv/config';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';

const PORT = process.env.PORT ?? 3000;

await connectDB();

app.listen(3300, () => {
    console.log(`Server started successfully on -- ${3300}`);
});