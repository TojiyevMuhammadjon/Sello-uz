const { Router } = require("express");
const {
  create,
  getOne,
  getAll,
  updatedProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const isSeller = require("../middlewares/isSeller.middleware");
const {
  searchProduct,
  paginationProduct,
} = require("../controllers/search.controller");

const router = new Router();
/**
 * @swagger
 * tags:
 *   name: Search
 *   description: The Search managing API
 */
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 */
/**
 * @swagger
 * /pagin/product:
 *   get:
 *     summary: Paginate products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: The number of items per page.
 *     responses:
 *       200:
 *         description: Paginated products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   description: An array of paginated products.
 *                 count:
 *                   type: integer
 *                   description: The total number of products.
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages.
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *       400:
 *         description: Bad request. Invalid page or limit values.
 */
router.get("/pagin/product", paginationProduct);

/**
 * @swagger
 * /search/product:
 *   get:
 *     summary: Search for products
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           description: The name or part of the product name to search for.
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *           description: The exact price of the product to search for.
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *           description: The brand or part of the product brand to search for.
 *       - in: query
 *         name: fromPrice
 *         schema:
 *           type: number
 *           description: The minimum price for products in the search results.
 *       - in: query
 *         name: toPrice
 *         schema:
 *           type: number
 *           description: The maximum price for products in the search results.
 *     responses:
 *       200:
 *         description: Search results.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   description: An array of products that match the search criteria.
 *       404:
 *         description: Product not found. No products match the search criteria.
 *       400:
 *         description: Bad request. Invalid query parameter values.
 */
router.get("/search/product", searchProduct);
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                   description: An array of products.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get("/product", isSeller, getAll);
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The product with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Product not found.
 */
router.get("/product/:id", isSeller, getOne);

/**
 * @swagger
 * /product/{id}:
 *   post:
 *     summary: Create a new product (seller)
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               info:
 *                 type: string
 *                 description: Additional information about the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               brand:
 *                 type: string
 *                 description: The brand of the product.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image of the product.
 *     responses:
 *       200:
 *         description: Product successfully created
 *       400:
 *         description: Bad request. Check the request parameters and data format.
 *       401:
 *         description: Unauthorized, seller access required
 */
router.post("/product/:id", isSeller, create);

/**
 * @swagger
 * /product/{pro_id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: pro_id
 *         required: true
 *         description: ID of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: Updated product data.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Updated product details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request or product not found.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.put("/product/:id/:pro_id", isSeller, updatedProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       400:
 *         description: Invalid request or product not found.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.delete("/product/:id", isSeller, deleteProduct);

module.exports = router;