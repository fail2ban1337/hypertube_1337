var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const authMiddleware = require("./middleware/auth");
const connectDB = require("./config/db");
const app = express();

// .env
var myEnv = dotenv.config();
dotenvExpand(myEnv);

// Connect Database
connectDB();

app.use(require("cors")());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
require("./config/passport")(passport);

// app.use(express.session({ secret: "secret" }));
app.use(passport.session());

// auth routes
app.use("/oauth", require("./routes/oauth_ret"));

app.use("/api/guest", require("./routes/guest.router"));
app.use("/api/auth", authMiddleware, require("./routes/auth.router"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/library", require("./routes/api/library"));
app.use("/api/streaming", require("./routes/api/streaming"));

app.listen(process.env.SERVER_PORT);
