const { Router } = require("express");
const {
  register,
  login,
  verify,
  getAll,
  getOne,
} = require("../controllers/seller.controller");
const router = new Router();

router.post("/seller/signup", register);
router.post("/seller/signin", login);
router.post("/seller/signup/verify", verify);

router.get("/seller", getAll);
router.get("/seller/:id", getOne);

module.exports = router;
