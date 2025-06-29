import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "../src/db/db";

async function main() {
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migrations complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
