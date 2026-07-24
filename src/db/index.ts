import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

let cachedDb: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (cachedDb) return cachedDb;

  const client = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  cachedDb = drizzle(client);
  return cachedDb;
}