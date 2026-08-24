import { defineConfig } from "drizzle-kit";

// Use environment variables for local/prod db URL
const url = process.env.DATABASE_URL || "postgresql://ieee:ieee_dev@localhost:5432/ieee_svce";

export default defineConfig({
  schema: "./packages/content-model/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
  verbose: true,
  strict: true,
});
