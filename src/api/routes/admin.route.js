const { Router } = require("express");
const { register, login } = require("../controllers/admin.controller");
const router = Router();

router.post("/admin/signup", register);
router.post("/admin/signin", login);

module.exports = router;
