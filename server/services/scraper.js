const axios = require("axios");
const cheerio = require("cheerio");

async function fetchArticles() {
  try {
    const url = "https://www.enn.com/";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const articles = [];

    $(".col-md-6").each((i, element) => {
      const title = $(element).find("h3 a").text().trim();
      const description = $(element).find("p").text().trim();
      let link = $(element).find("h3 a").attr("href");
      let imgSrc = $(element).find("img").attr("src");

      if (link && !link.startsWith("http")) {
        link = url + link;
      }
      if (imgSrc && imgSrc.startsWith("//")) {
        imgSrc = `https:${imgSrc}`;
      }

      if (!title || !description || !link || !imgSrc) {
        console.error("Missing data for article:", {
          title,
          description,
          link,
          imgSrc,
        });

        return;
      }

      articles.push({
        title,
        description,
        link,
        imgSrc,
      });
    });
    return articles;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

module.exports = fetchArticles;