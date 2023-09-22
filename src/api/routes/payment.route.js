const { Router } = require("express");
const { payment, userPayment } = require("../controllers/payment.controller");
const isUser = require("../middlewares/isUser.middleware");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment for Users
 */

/**
 * @swagger
 * /create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: body
 *         name: paymentData
 *         description: Payment data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             id:
 *               type: string
 *             user_id:
 *               type: string
 *     responses:
 *       200:
 *         description: Payment was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 clientSecret:
 *                   type: string
 *       400:
 *         description: Payment Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/create-payment-intent", isUser, payment);

/**
 * @swagger
 * /user/payment/{product_id}:
 *   post:
 *     summary: Make a payment for a product
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: path
 *         name: product_id
 *         description: ID of the product to purchase
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: paymentData
 *         description: Payment data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Balance is out of range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found or Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/user/payment/:product_id", isUser, userPayment);

module.exports = router;
