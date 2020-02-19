const mongose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDb = async () => {
  try {
    await mongose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDb Connected...");
  } catch (error) {
    console.log(error);
    // Exit process with failure
    process.exit(1);
  }

  // tmp
  // const mongoose = require("mongoose");
  // mongoose
  //   .connect(process.env.MONGO_URI, {
  //     useCreateIndex: true,
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //   })
  //   .then(() => {
  //     console.log("MongoDb Connected...");
  //   })
  //   .catch(err => console.error("Error connecting to MongoDB: ", err.message));
};
module.exports = connectDb;
