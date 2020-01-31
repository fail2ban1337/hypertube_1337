const express = require("express");
const connectDB = require("./config/db");

const app = express();
// Connect Database
connectDB();
const port = process.env.PORT || 5000;

//init middleware
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/library", require("./routes/api/library"));
app.use("/api/streaming", require("./routes/api/streaming"));

app.listen(port, () => console.log(`Listening on port ${port}`));
