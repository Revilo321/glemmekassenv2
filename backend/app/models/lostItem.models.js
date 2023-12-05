module.exports = (sequelize, Sequelize) => {
    const lostItem = sequelize.define('lostItem', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        dateTime: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING
        },
        userUid: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'uid'
            }
        }
    });

    return lostItem;
  };