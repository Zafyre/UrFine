const mongoose = require("mongoose");
const appLogger = require("../utils/appLogger");

mongoose.connect(process.env.MONGO_SRV, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to database!"));

db.once("open", () => {
	appLogger("Connected to MongoDB!");
});

module.exports = db;
