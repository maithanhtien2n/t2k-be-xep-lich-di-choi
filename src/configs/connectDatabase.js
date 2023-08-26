const Sequelize = require("sequelize");
const sequelize = new Sequelize("t2kproject", "tien2000", "tien2000", {
  host: "db4free.net",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối database thành công!");
  })
  .catch((error) => {
    console.error("Kết nối database lỗi:", error);
  });

module.exports = sequelize;
