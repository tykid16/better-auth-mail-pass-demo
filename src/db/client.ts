import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const queryClient = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

export const db = drizzle(queryClient, { schema });