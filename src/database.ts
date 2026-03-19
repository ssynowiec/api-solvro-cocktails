import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { schema } from "./db/schema";
import { env } from "./env";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
export const database = drizzle(pool, { schema });
