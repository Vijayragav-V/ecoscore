const router = require("express").Router();
const userRoutes = require("./userRoutes");
const actionRoutes = require("./actionRoutes");
const articleRoutes = require("./articleRoutes");

router.use("/user", userRoutes);
router.use("/action", actionRoutes);
router.use("/article", articleRoutes);

module.exports = router;
