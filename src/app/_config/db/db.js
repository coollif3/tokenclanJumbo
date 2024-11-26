import config from "./config";
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const poolConfig = {
  max: 30, // Maximum number of connections in the pool
  min: 0, // Minimum number of connections in the pool
  acquire: 60000, // Maximum time (in ms) that pool will try to get a connection before throwing an error
  idle: 12000, // Maximum time (in ms) that a connection can be idle before being released
};

const bcSequelize = new Sequelize(
  config["dbBlockchain"],
  config["dbUser"],
  config["dbPass"],
  {
    host: config["dbHost"],
    dialect: "mysql",
    dialectModule: mysql2,
    pool: poolConfig,
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
    pool: poolConfig,
  }
);

const cSequelize = new Sequelize(
  config["dbCoin"],
  config["dbUser"],
  config["dbPass"],
  {
    host: config["dbHost"],
    dialect: "mysql",
    dialectModule: mysql2,
    pool: poolConfig,
  }
);

const sequelize = {
  blockchain: bcSequelize,
  exchange: eSequelize,
  coin: cSequelize,
};

export default sequelize;
export const blockchain = bcSequelize;
export const exchange = eSequelize;
export const coin = cSequelize;
