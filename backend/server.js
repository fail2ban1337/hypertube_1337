const express = require("express");
const connectDB = require("./config/db");
var passport = require("passport");
var cors = require('cors')

const app = express();

app.use(cors())
// Connect Database
connectDB();
const port = process.env.PORT || 5000;

//init middleware
app.use(express.json({ extended: false }));

//passport config
require('./config/passport')(passport);
// passport middleware setup ( it is mandatory to put it after session middleware setup)
// app.use(express.session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/library", require("./routes/api/library"));
app.use("/api/streaming", require("./routes/api/streaming"));

app.listen(port, () => console.log(`Listening on port ${port}`));
