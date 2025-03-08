/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_j6buQ4SwrHef@ep-floral-band-a8z5pidg-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };