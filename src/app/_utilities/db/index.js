import db from "../../_config/db/db";

async function getDB() {
  try {
    // console.log(db);
    await db.blockchain.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default getDB;
