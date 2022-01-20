const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.get("/", (req, res) => res.send("WE are running"));
app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));

const port = process.env.port || 3000;
app.listen(port, console.log("server är running"));
