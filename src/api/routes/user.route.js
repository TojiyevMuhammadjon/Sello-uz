const { Router } = require("express");
const {
  register,
  login,
  verify,
  getAll,
  getOne,
} = require("../controllers/user.controller");
const router = new Router();

router.get("/auth", getAll);
router.get("/auth/:id", getOne);

router.post("/auth/signup", register);
router.post("/auth/signin", login);
router.post("/auth/signup/verify", verify);

module.exports = router;
