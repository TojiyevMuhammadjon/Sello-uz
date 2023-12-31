const { Router } = require("express");
const {
  register,
  login,
  verify,
  getAll,
  getOne,
} = require("../controllers/user.controller");
const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing API
 */
/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully retrieved all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found.
 */

router.get("/auth", getAll);

/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 */
router.get("/auth/:id", getOne);


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User registration successful.
 *       400:
 *         description: Bad request. Invalid user data.
 *       409:
 *         description: Conflict. User already exists.
 */
router.post("/auth/signup", register);


/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       201:
 *         description: User login successful.
 *       400:
 *         description: Bad request. Invalid login data.
 *       404:
 *         description: Not found. User not found.
 */
router.post("/auth/signin", login);


/**
 * @swagger
 * /auth/signup/verify:
 *   post:
 *     summary: Verify user registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserVerification'
 *     responses:
 *       201:
 *         description: User registration verified.
 *       400:
 *         description: Bad request. Invalid verification data.
 *       404:
 *         description: Not found. Verification code does not match.
 */
router.post("/auth/signup/verify", verify);

module.exports = router;
