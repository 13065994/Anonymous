const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/note");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// static files images
app.use("/images", express.static("images"));
app.set("view engine", "ejs");
app.use("/", noteRoutes);

sequelize
	.sync()
	.then(() => {
		app.listen(3000, () => {
			console.log("Server is running on http://localhost:3000");
		});
	})
	.catch(err => {
		console.error("Unable to connect to the database:", err);
	});
