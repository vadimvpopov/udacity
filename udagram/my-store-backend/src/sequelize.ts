import { Sequelize } from "sequelize-typescript";
import { config } from "./config/config";
import { User, Product } from "./models/sequelize/User"

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,

  dialect: "postgres",
  storage: ":memory:",
  models: [User, Product]
});
