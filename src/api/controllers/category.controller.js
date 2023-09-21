const CustomError = require("../../libs/customError");
const Admins = require("../../entities/admin.entity");

const Category = require("../../entities/category.entity");
const categoryValidation = require("../validations/category.validation");

const categoryCreate = async (req, res, next) => {
  try {
    const { name } = req.body;

    const validationError = categoryValidation({
      name,
    });
    if (validationError) throw new CustomError(400, validationError.message);

    const findCategory = await Category.findAll({
      where: { name },
      logging: false,
    });
    if (findCategory.length > 0) {
      throw new CustomError(404, "Category not found");
    }

    const newCategory = await Category.create(
      { name, admin_id: req.user },
      { logging: false }
    );
    res.status(201).json({ message: "succes", newCategory });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const category = await Category.findAll({
      include: [
        {
          model: Admins,
          attributes: ["id", "username", "created_at", "updated_at"],
        },
      ],
    });
    if (category.length < 1) throw new CustomError(404, "Category not found");

    res.status(200).json({ message: "SUCCES", category });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id, {
      include: [
        {
          model: Admins,
          attributes: ["id", "username", "created_at", "updated_at"],
        },
      ],
      logging: false,
    });

    res.status(201).json({ message: "SUCCES", category });
  } catch (error) {
    next();
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const validationError = categoryValidation({
      name,
    });
    if (validationError) throw new CustomError(400, validationError.message);

    const findCategory = await Category.findByPk(id, { logging: false });

    if (findCategory) {
      const newCategory = await findCategory.update(
        { name, admin_id: req.user },
        { logging: false }
      );
      res.status(201).json({ message: "Succesfully updated", newCategory });
    }
    throw new CustomError(404, "Category not found");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categ = await Category.findByPk(id, { logging: false });
    const deleteCategory = await categ.destroy({ logging: false });
    res.status(201).json({ message: "Succesfully deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categoryCreate,
  getAll,
  getOne,
  deleteCategory,
  updateCategory,
};
