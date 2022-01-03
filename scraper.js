const puppeteer = require("puppeteer");

const blockedDomains = ["googlesyndication.com", "adservice.google.com"];
const args = [
	"--autoplay-policy=user-gesture-required",
	"--disable-background-networking",
	"--disable-background-timer-throttling",
	"--disable-backgrounding-occluded-windows",
	"--disable-breakpad",
	"--disable-client-side-phishing-detection",
	"--disable-component-update",
	"--disable-default-apps",
	"--disable-dev-shm-usage",
	"--disable-domain-reliability",
	"--disable-extensions",
	"--disable-features=AudioServiceOutOfProcess",
	"--disable-hang-monitor",
	"--disable-ipc-flooding-protection",
	"--disable-notifications",
	"--disable-offer-store-unmasked-wallet-cards",
	"--disable-popup-blocking",
	"--disable-print-preview",
	"--disable-prompt-on-repost",
	"--disable-renderer-backgrounding",
	"--disable-setuid-sandbox",
	"--disable-speech-api",
	"--disable-sync",
	"--hide-scrollbars",
	"--ignore-gpu-blacklist",
	"--metrics-recording-only",
	"--mute-audio",
	"--no-default-browser-check",
	"--no-first-run",
	"--no-pings",
	"--no-sandbox",
	"--no-zygote",
	"--password-store=basic",
	"--use-gl=swiftshader",
	"--use-mock-keychain",
];

const evalElement = async (el, selector, fn) => {
	if (await el.$(selector)) {
		return await el.$eval(selector, fn);
	}

	return null;
};

const data = {
	dev: {
		name: "DEV",
		url: "https://dev.to/top/week",
		elementSelector:
			"main[id='main-content'] > div[id='substories'] > div[class='crayons-story ']",
		filter: () => null,
		getNextPageButton: () => null,
		scrapeData: async (element) => {
			const scrapedData = {
				postURL: await evalElement(
					element,
					"h2[class='crayons-story__title'] > a[id*='article-link']",
					(node) => `https://dev.to${node.getAttribute("href")}`
				),
				title: await evalElement(
					element,
					"h2[class='crayons-story__title'] > a[id*='article-link']",
					(node) => node.innerText.trim()
				),
				author: await evalElement(
					element,
					"div[class*='profile-preview-card'] > button[id*='story-author-preview-trigger']",
					(node) => node.innerText.trim()
				),
				likes: await evalElement(
					element,
					"div[class='crayons-story__details'] > a[data-reaction-count]",
					(node) => Number(node.innerText.trim().split(" ")[0])
				),
				comments: await evalElement(
					element,
					"div[class='crayons-story__details'] > a:not([data-reaction-count])",
					(node) => Number(node.innerText.trim().split(" ")[0])
				),
			};

			const username = scrapedData.postURL.split("/")[3];
			scrapedData.authorURL = `https://dev.to/${username}`;

			return scrapedData;
		},
		results: [],
	},
	githubTrending: {
		name: "Github Trending",
		url: "https://github.com/trending",
		elementSelector:
			"div[class='Box'] > div:not([class]) > article[class='Box-row']",
		filter: () => null,
		getNextPageButton: () => null,
		scrapeData: async (element) => {
			const scrapedData = {
				postURL: await evalElement(
					element,
					"h1[class*='lh-condensed'] > a",
					(node) => `https://github.com${node.getAttribute("href")}`
				),
				title: await evalElement(
					element,
					"h1[class*='lh-condensed'] > a",
					(node) => node.innerText.trim().split(" ")[2]
				),
				description: await evalElement(
					element,
					"p[class='col-9 color-fg-muted my-1 pr-4']",
					(node) => node.innerText.trim()
				),
				author: await evalElement(
					element,
					"h1[class*='lh-condensed'] > a > span",
					(node) => node.innerText.trim().split(" ")[0]
				),
				likes: await evalElement(
					element,
					"div[class='f6 color-fg-muted mt-2'] > a[href*='stargazers']",
					(node) => Number(node.innerText.trim())
				),
				comments: null,
			};

			scrapedData.authorURL = `https://github.com/${scrapedData.author}`;
			scrapedData.title = `${scrapedData.title} - ${scrapedData.description}`;

			return scrapedData;
		},
		results: [],
	},
	hackerNews: {
		name: "Hacker News",
		url: "https://news.ycombinator.com/",
		elementSelector: "table[class='itemlist'] > tbody > tr[class='athing']",
		filter: () => null,
		getNextPageButton: async (page) =>
			await page.$("table[class='itemlist'] > tbody a[class='morelink']"),
		scrapeData: async (element) => {
			return {
				postURL: await evalElement(
					element,
					"td:not([valign]) > a[class='titlelink']",
					(node) => node.getAttribute("href")
				),
				title: await evalElement(
					element,
					"td:not([valign]) > a[class='titlelink']",
					(node) => node.innerText.trim()
				),
			};
		},
		results: [],
	},
	hackerNewsTemporary: {
		url: "https://news.ycombinator.com/",
		elementSelector: "table[class='itemlist'] > tbody > tr:not([class])",
		filter: () => null,
		getNextPageButton: async (page) =>
			await page.$("table[class='itemlist'] > tbody a[class='morelink']"),
		scrapeData: async (element) => {
			return {
				author: await evalElement(
					element,
					"td[class='subtext'] > a[class='hnuser']",
					(node) => node.innerText.trim()
				),
				authorURL: await evalElement(
					element,
					"td[class='subtext'] > a[class='hnuser']",
					(node) => `https://news.ycombinator.com/${node.getAttribute("href")}`
				),
				likes: await evalElement(
					element,
					"td[class='subtext'] > span[class='score']",
					(node) => Number(node.innerText.trim().split(" ")[0])
				),
				comments: await evalElement(
					element,
					"td[class='subtext'] > :last-child",
					(node) => Number(node.innerText.trim().split(" ")[0])
				),
			};
		},
		results: [],
	},
	designerNews: {
		name: "Designer News",
		url: "https://www.designernews.co/",
		elementSelector:
			"ul[class='montana-list-items'] > li[class*='montana-list-item ']",
		filter: () => null,
		getNextPageButton: async (page) =>
			await page.$(
				"div[class='montana-list-pagination'] > a[class='montana-list-pagination-next']"
			),
		scrapeData: async (element) => {
			return {
				postURL: await evalElement(
					element,
					"div[class*='list-story-main-grouper'] > a[class='montana-item-title']",
					(node) => node.getAttribute("href")
				),
				title: await evalElement(
					element,
					"div[class*='list-story-main-grouper'] > a[class='montana-item-title']",
					(node) => node.getAttribute("alt")
				),
				author: await evalElement(
					element,
					"div[class='montana-item-meta'] > span > a[data-card]",
					(node) => node.innerText.trim()
				),
				authorURL: await evalElement(
					element,
					"div[class='montana-item-meta'] > span > a[data-card]",
					(node) => node.getAttribute("href")
				),
				likes: await evalElement(
					element,
					"div[class*='list-story-upvote-grouper'] > span[class='story-vote-count']",
					(node) => Number(node.innerText.trim())
				),
				comments: await evalElement(
					element,
					"div[class='montana-item-meta'] > a[class='list-story-comment-count']",
					(node) => Number(node.innerText.trim().split(" ")[0])
				),
			};
		},
		results: [],
	},
	slashdot: {
		name: "Slashdot",
		url: "https://slashdot.org/?fhfilter=opensource",
		elementSelector: "div[class*='fhroot'] > article[class*='fhitem']",
		filter: () => null,
		getNextPageButton: async (page) =>
			await page.$("div[id='fh-paginate'] > a[class='prevnextbutact']"),
		scrapeData: async (element) => {
			return {
				postURL: await evalElement(
					element,
					"span[class='story-title'] > a:not([class])",
					(node) => node.getAttribute("href")
				),
				title: await evalElement(
					element,
					"span[class='story-title'] > a:not([class])",
					(node) => node.innerText.trim()
				),
				author: await evalElement(
					element,
					"span[class='story-byline']",
					(node) => node.innerText.trim().split(" ")[2]
				),
				authorURL: await evalElement(
					element,
					"span[class='story-byline'] > a",
					(node) => node.getAttribute("href")
				),
				likes: null,
				comments: await evalElement(
					element,
					"span[class='comment-bubble'] > a",
					(node) => node.innerText.trim()
				),
			};
		},
		results: [],
	},
	reddit: {
		name: "Reddit",
		url: "https://old.reddit.com/r/programming/top/?t=week",
		elementSelector: "div[id='siteTable'] > div[class*='thing']",
		filter: async (element) =>
			await element.$("span[class*='sponsored-indicator']"),
		getNextPageButton: async (page) =>
			await page.$("span[class='next-button'] > a[rel='nofollow next']"),
		scrapeData: async (element) => {
			return {
				postURL: await evalElement(
					element,
					"p[class='title'] > a[class*='title']",
					(node) => node.getAttribute("href")
				),
				title: await evalElement(
					element,
					"p[class='title'] > a[class*='title']",
					(node) => node.innerText.trim()
				),
				author: await evalElement(
					element,
					"p[class*='tagline'] > a[class*='author']",
					(node) => node.innerText.trim()
				),
				authorURL: await evalElement(
					element,
					"p[class*='tagline'] > a[class*='author']",
					(node) => node.getAttribute("href")
				),
				likes: await evalElement(
					element,
					"div[class*='unvoted'] > div[class='score likes']",
					(node) => node.innerText.trim()
				),
				comments: await evalElement(
					element,
					"a[data-event-action='comments']",
					(node) => node.innerText.trim()
				),
			};
		},
		results: [],
	},
};

const scraper = async (requestedNum) => {
	const browser = await puppeteer.launch({ args });
	const page = await browser.newPage();

	await page.setRequestInterception(true);

	page.on("request", (req) => {
		if (
			req.resourceType() === "image" ||
			blockedDomains.some((domain) => req.url().includes(domain))
		) {
			req.abort();
		} else {
			req.continue();
		}
	});

	for (const source in data) {
		const { url, elementSelector, filter, scrapeData, getNextPageButton } =
			data[source];

		await page.goto(url, { waitUntil: "networkidle0" });

		const scrape = async () => {
			const elements = await page.$$(elementSelector);

			for (const element of elements) {
				if (
					(await filter(element)) ||
					data[source].results.length >= requestedNum
				) {
					continue;
				}

				data[source].results.push(await scrapeData(element));
			}
		};

		while (data[source].results.length < requestedNum) {
			await scrape();

			if (data[source].results.length < requestedNum) {
				const nextPageButton = await getNextPageButton(page);

				if (nextPageButton) {
					await nextPageButton.click();
					await page.waitForNavigation({ waitUntil: "networkidle0" });
				} else {
					break;
				}
			}
		}
	}

	browser.close();

	for (let i = 0; i < data.hackerNews.results.length; i++) {
		data.hackerNews.results[i] = {
			...data.hackerNews.results[i],
			...data.hackerNewsTemporary.results[i],
		};
	}

	delete data.hackerNewsTemporary;

	return data;
};

module.exports = { scraper };
