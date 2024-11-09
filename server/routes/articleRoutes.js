const articleController = require("../controllers/articleController");
const router = require("express").Router();

router.get("/", articleController.getArticles);

module.exports = router;
