const { Router } = require("express");
const { payment, userPayment } = require("../controllers/payment.controller");

const router = Router();

router.post("/create-payment-intent", payment );
router.post("/user/payment", userPayment)

module.exports = router;
