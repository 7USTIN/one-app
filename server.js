const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");
const { port, mongoURI } = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch(console.error);

app.use("/api/", routes);

app.listen(port, () => {
	console.log(`Express server listening on ${port}`);
});
