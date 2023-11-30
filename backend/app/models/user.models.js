module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    uid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  })

  return user
}
