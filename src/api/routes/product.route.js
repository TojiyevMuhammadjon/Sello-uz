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

router.get("/pagin/product", paginationProduct);
router.get("/search/product", searchProduct);
router.get("/product", isSeller, getAll);
router.get("/product/:id", isSeller, getOne);

router.post("/product/:id", isSeller, create);
router.post("/product/:id", isSeller, getOne);

router.put("/product/:id/:pro_id", isSeller, updatedProduct);
router.delete("/product/:id", isSeller, deleteProduct);

module.exports = router;
