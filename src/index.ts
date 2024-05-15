import express, { response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { tasks } from './db/schema';

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT;
if (!PORT) {
    console.log("Port not defined in the .env file.");
    process.exit(0);
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.log("Missing DATABASE_URL setting in .env file.");
    process.exit(0);
}

app.get('/api/tasks', async (request, response) => {
    const queryClient = postgres(DATABASE_URL);
    const db = drizzle(queryClient);
    const result = await db.select().from(tasks);
    response.send(result);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});