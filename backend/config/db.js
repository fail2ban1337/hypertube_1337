const mongose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDb = async () => {
  try {
    await mongose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("MongoDb Connected...");
  } catch (error) {
    console.log(error);
    // Exit process with failure
    process.exit(1);
  }
};
module.exports = connectDb;
