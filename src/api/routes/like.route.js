const { Router } = require("express");
const isUser = require("../middlewares/isUser.middleware");
const { likes, getAll } = require("../controllers/like.controller");

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: The Like managing API
 */
/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Get a user's liked products
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of liked products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                 likedProducts:
 *                   type: array
 *                   description: List of liked products.
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Define properties of the liked product here
 *       401:
 *         description: Unauthorized, user access required
 *       404:
 *         description: User not found or no liked products found
 */
router.get("/likes", isUser, getAll);

/**
 * @swagger
 * /likes/{product_id}:
 *   post:
 *     summary: Like a product (user)
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to like.
 *     responses:
 *       201:
 *         description: Product liked successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                 createLike:
 *                   type: object
 *                   description: Details of the like created.
 *       400:
 *         description: Bad request, invalid input or product not found.
 *       401:
 *         description: Unauthorized, user access required.
 */

router.post("/likes/:product_id", isUser, likes);

module.exports = router;