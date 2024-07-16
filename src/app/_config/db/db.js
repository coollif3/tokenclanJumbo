import config from "./config";
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const bcSequelize = new Sequelize(
  config["dbBlockchain"],
  config["dbUser"],
  config["dbPass"],
  {
    host: config["dbHost"],
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

const eSequelize = new Sequelize(
  config["dbExchange"],
  config["dbUser"],
  config["dbPass"],
  {
    host: config["dbHost"],
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

const sequelize = {
  blockchain: bcSequelize,
  exchange: eSequelize,
};

export default sequelize;
export const blockchain = bcSequelize;
export const exchange = eSequelize;
