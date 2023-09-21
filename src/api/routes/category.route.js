const { Router } = require("express");
const {
  getAll,
  getOne,
  categoryCreate,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { searchCategory } = require("../controllers/search.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");

const router = new Router();

router.get("/search/category", searchCategory);
router.get("/category", getAll);
router.get("/category/:id", getOne);

router.post("/admin/category", isAdmin, categoryCreate);

router.put("/admin/category/:id", isAdmin, updateCategory);
router.delete("/admin/category/:id", isAdmin, deleteCategory);

module.exports = router;
