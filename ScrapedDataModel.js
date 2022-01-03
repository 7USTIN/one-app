const { Schema, model } = require("mongoose");

const scrapedDataSchema = new Schema({
	data: {
		type: Object,
		required: true,
	},
});

module.exports = model("scrapedData", scrapedDataSchema, "scrapedData");
