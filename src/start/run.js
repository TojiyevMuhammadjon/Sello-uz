const config = require("config");
const port = config.get("port");
const sequlize = require("../database/index");

const bootstrapt = async (app) => {
  await sequlize.authenticate({
    logging: false,
  });
  await sequlize.sync({ alter: true, logging: false });
  app.listen(port, () => {
    const decorativeLine = "*".repeat(50);
    console.log(`\n${decorativeLine}`);
    console.log(`  🚀 Server is running on port ${port}`);
    console.log(`${decorativeLine}\n`);
  });
};

module.exports = bootstrapt;
