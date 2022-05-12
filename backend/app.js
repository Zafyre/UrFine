const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const db = require("./config/database");
const appLogger = require("./utils/appLogger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes"));

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
	res.send("Server running successfully!");
});

app.listen(port, () => {
	appLogger(`Server started on port ${port}`);
});
