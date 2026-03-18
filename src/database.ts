import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "./env";

// You can specify any property from the node-postgres connection options
const database = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
    ssl: true,
  },
});
