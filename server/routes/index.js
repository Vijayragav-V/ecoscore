const router = require("express").Router();
const userRoutes = require("./userRoutes");
const actionRoutes = require("./actionRoutes");

router.use("/user", userRoutes);
router.use("/action", actionRoutes);

module.exports = router;
