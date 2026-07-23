const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const subscriptionCheck = require("../middlewares/subscriptionCheck");
const UserController = require("../controllers/UserController");

router.get("/me", auth, UserController.getProfile);
router.get("/", UserController.listUsers);
module.exports = router;
