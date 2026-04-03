import { env as loadEnv } from "custom-env";
import { z } from "zod";

loadEnv();

const envSchema = z.object({
  PORT: z.coerce.number().positive().default(3000),
  DATABASE_URL: z.string().startsWith("postgresql://"),
  CLIENT_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;
try {
  env = envSchema.parse(process.env);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("Invalid environment variables:");
    e.issues.forEach((err) => {
      console.error(`  ${err.path.join(".")}: ${err.message}`);
    });
    process.exit(1);
  }
  throw e;
}

export { env };
export default env;
