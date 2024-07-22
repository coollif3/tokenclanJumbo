const {
  NODE_ENV,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DEMO_DB_HOST,
  DEMO_DB_USER,
  DEMO_DB_PASS,
  DB_BLOCKCHAIN,
  DB_EXCHANGE,
} = process.env;

let config = {};

if (NODE_ENV === "production") {
  config = {
    env: NODE_ENV,
    dbHost: DB_HOST,
    dbUser: DB_USER,
    dbPass: DB_PASS,
    dbBlockchain: DB_BLOCKCHAIN,
    dbExchange: DB_EXCHANGE,
  };
} else {
  config = {
    env: "development",
    dbHost: DEMO_DB_HOST,
    dbUser: DEMO_DB_USER,
    dbPass: DEMO_DB_PASS,
    dbBlockchain: DB_BLOCKCHAIN,
    dbExchange: DB_EXCHANGE,
  };
}

export default config;
