import { drizzle } from "pg";
import { Pool } from "pg";
import { env } from "../../env";
// import * as schema "./schema"

const createPool = () => {
  return new Pool({
    connectionString: env.DATABASE_URL,
  });
};

const client = drizzle("dbPool", () => createPool());

export const db = drizzle({ client });
export default db;
