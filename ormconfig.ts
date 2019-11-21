import { User } from "./src/app/server/entity/user.entity";
import getConfig from "./src/app/config/config";
const {
  dbConfig: { type, host, password, port, database, username },
} = getConfig();

module.exports = {
  type,
  host,
  port,
  username,
  password,
  database,
  name: "default",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["src/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
