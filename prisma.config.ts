import { defineConfig, env } from "prisma/config";

try {
  process.loadEnvFile();
} catch (e) {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
    directUrl: env("DIRECT_URL"),
  },
});
