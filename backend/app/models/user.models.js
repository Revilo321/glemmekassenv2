const db = require('../models')
const message = db.message;


module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    uid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    zipcode: {
      type: Sequelize.INTEGER,
    },
    city: {
      type: Sequelize.STRING,
    }

  });
  return user
}
