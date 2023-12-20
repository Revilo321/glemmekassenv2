const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, '', {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.sync()
db.user = require("./user.models.js")(sequelize, Sequelize);
db.message = require("./message.models.js")(sequelize, Sequelize);
db.items = require("./item.models.js")(sequelize,Sequelize);
db.user.hasMany(db.message, {
  as: 'SentMessages',
  foreignKey: 'receiverId',
});

db.user.hasMany(db.message, {
  as: 'ReceivedMessages',
  foreignKey: 'senderId',
});

db.message.belongsTo(db.user, { as: 'Sender', foreignKey: 'senderId' });
db.message.belongsTo(db.user, { as: 'Receiver', foreignKey: 'receiverId' });
module.exports = db;