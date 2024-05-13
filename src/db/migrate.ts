import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    console.log("Missing DATABASE_URL setting in .env file.");
    process.exit(0);
}

const migrationClient = postgres(DATABASE_URL, { max: 1 });

const db = drizzle(migrationClient);

async function run() {
    console.log("Migration started...");
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log("Migration ended.");
    process.exit(0);
}

run().catch(err => {
    console.log(err);
    process.exit(0);
});