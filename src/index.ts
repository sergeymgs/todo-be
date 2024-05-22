import express, { response } from "express";
import cors from "cors";

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { tasks } from "./db/schema";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

const queryClient = postgres(DATABASE_URL);
const db = drizzle(queryClient);

app.get("/api/tasks", async (request, response) => {
  const result = await db.select().from(tasks);
  response.send(result);
});

app.post("/api/tasks", async (req, res) => {
  const item = req.body;
  const createdTask = await db.insert(tasks).values(item).returning();
  res.status(201).send(createdTask);
});

app.delete("/api/tasks/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(tasks).where(eq(tasks.id, id));
  res.status(204).send();
});

app.put("/api/tasks/:id", async (req, res) => {
  const data = req.body;
  const id = parseInt(req.params.id);
  await db.update(tasks).set(data).where(eq(tasks.id, id));
  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
