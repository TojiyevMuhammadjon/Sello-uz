const { Router } = require("express");
const isUser = require("../middlewares/isUser.middleware");
const {
  likes,
  getAll,
  backetsControl,
  getBackets,
} = require("../controllers/like.controller");

const router = new Router();

// like
router.get("/likes", isUser, getAll);
router.post("/likes/:product_id", isUser, likes);

// backets

router.get("/backets", isUser, getBackets);
router.post("/backets/:product_id", isUser, backetsControl);

module.exports = router;
