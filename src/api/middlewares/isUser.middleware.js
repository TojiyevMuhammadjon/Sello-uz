const CustomError = require("../../libs/customError");
const { verify } = require("../../libs/jwt");
const Users = require("../../entities/user.entity");

const isUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new CustomError(400, "Invalid token provided");

    const { id } = verify(token);
    const findUser = await Users.findByPk(id, { logging: false });

    if (findUser == null) throw new CustomError(403, "Permission denied");
    req.user = id;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = isUser;
