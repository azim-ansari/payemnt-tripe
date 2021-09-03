/** @format */

const express = require("express");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const indexRouter = require("./routes/index");
require("dotenv").config();
const app = express();
//handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//bosyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set static folder
app.use(express.static(`${__dirname}/public`));
// index Route
app.get("/", (req, res) => {
	res.render("index", { stripePublishableKey: keys.stripePublishableKey });
});
app.get("/success", (req, res) => {
	res.render("success");
});
app.use("/", indexRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
