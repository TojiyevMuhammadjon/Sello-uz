const { Router } = require("express");
const { payment, userPayment } = require("../controllers/payment.controller");
const isUser = require("../middlewares/isUser.middleware");

const router = Router();

router.post("/create-payment-intent", isUser, payment);
router.post("/user/payment/:product_id", isUser, userPayment);

module.exports = router;
