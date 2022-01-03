const { Router } = require("express");

const router = Router();
const ScrapedData = require("./ScrapedDataModel");

router.get("/", async (req, res) => {
	try {
		const scrapedData = await ScrapedData.find();

		res.status(200).json(scrapedData);
	} catch ({ message }) {
		res.status(500).json({ message });
	}
});

module.exports = router;
