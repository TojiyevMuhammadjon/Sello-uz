const CustomError = require("../../libs/customError");
const { verify } = require("../../libs/jwt");
const Admins = require("../../entities/admin.entity");

const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if(!token) throw new CustomError(400, "Invalid token provided");
    const { id } = verify(token);
    const findAdmin = await Admins.findByPk(id, { logging: false });
    if (findAdmin == null) throw new CustomError(403, "Permission denied");
    req.user = id
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isAdmin;
