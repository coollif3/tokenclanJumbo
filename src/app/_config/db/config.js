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
  USEREDIS,
  REDIS_HOST,
  REDIS_PORTS,
  REDIS_PASS,
} = process.env;

let config = {};

if (NODE_ENV === "production") {
  config = {
    env: NODE_ENV,
    useRedis: USEREDIS,
    dbHost: DB_HOST,
    dbUser: DB_USER,
    dbPass: DB_PASS,
    dbBlockchain: DB_BLOCKCHAIN,
    dbExchange: DB_EXCHANGE,
    redisHost: REDIS_HOST,
    redisPort: REDIS_PORTS,
    redisPass: REDIS_PASS,
  };
} else {
  config = {
    env: "development",
    useRedis: false,
    dbHost: DEMO_DB_HOST,
    dbUser: DEMO_DB_USER,
    dbPass: DEMO_DB_PASS,
    dbBlockchain: DB_BLOCKCHAIN,
    dbExchange: DB_EXCHANGE,
  };
}

export default config;
