module.exports = (sequelize, Sequelize) => {
    const message = sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        senderId: {
            type: Sequelize.STRING,
            allowNull: false,
            refereces: {
                model: 'Users',
                key: 'uid'
            }
        },
        receiverId: {
            type: Sequelize.STRING,
            allowNull: false,
            refereces: {
                model: 'Users',
                key: 'uid'
            }
        },
        text: {
            type: Sequelize.STRING
        }
    });
  
    return message;
  };