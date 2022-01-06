const { scraper } = require("./scraper");
const ScrapedData = require("./ScrapedDataModel");

const postData = async () => {
	const data = await scraper(20);
	const newScrapedData = new ScrapedData({ data });

	try {
		await ScrapedData.deleteMany({});
		await newScrapedData.save();
	} catch (err) {
		console.error(err);
	}
};

const scheduler = async () => {
	const hour = 60 * 60 * 1000;
	const date = new Date();
	const firstCall = hour - (date.getMinutes() * 60 + date.getSeconds()) * 1000;

	setTimeout(() => {
		postData();
		setInterval(postData, hour);
	}, firstCall);
};

module.exports = { scheduler };
