const fetchArticles = require("../services/scraper");

const getArticles = async (req, res) => {
  try {
    const news = await fetchArticles();
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getArticles };
