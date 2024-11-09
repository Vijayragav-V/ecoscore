const router = require("express").Router();
const actionController = require("../controllers/actionController");
const authHandler = require("../middleware/authHandler");

router.get("/", actionController.getActions);
router.post("/", authHandler, actionController.completeAction);

module.exports = router;