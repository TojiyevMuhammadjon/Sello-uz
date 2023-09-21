const config = require("config");
const port = config.get("port");
const sequlize = require("../database/index");

const bootstrapt = async (app) => {
  await sequlize.authenticate({
    logging: false,
  });
  await sequlize.sync({ alter: true, logging: false, force: true });
  app.listen(port, () => {
    console.log(
      `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`
    );
    console.log(`                             Listening on ${port}`);
    console.log(
      `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`
    );
  });
};

module.exports = bootstrapt;
