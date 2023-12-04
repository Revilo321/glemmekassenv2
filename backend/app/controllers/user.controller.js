const db = require('../models')
const User = db.user;
const Message = db.message;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const { uid, email, name, phone, age, zipcode, city } = req.body

  User.create({ uid, email, name, phone, age, zipcode, city })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
}

exports.findChats = (req, res) => {
  const currentUserId = req.params.id;
  User.findAll({
    attributes: ['uid', 'name'],
    include: [{
      model: Message,
      as: 'SentMessages',
      attributes: [['text', 'latestMessageText'], ['createdAt', 'latestMessageCreatedAt']],
      where: {
        senderId: currentUserId,
      },
      limit: 1,
      order: [['createdAt', 'DESC']]
    }, {
      model: Message,
      as: 'ReceivedMessages',
      attributes: [['text', 'latestMessageText'], ['createdAt', 'latestMessageCreatedAt']],
      where: {
        receiverId: currentUserId,
      },
      limit: 1,
      order: [['createdAt', 'DESC']]
    }],
    where: {
      uid: {
        [Op.not]: currentUserId
      }
    },
    group: ['User.uid']
  })
  .then(users => {
    const filteredUsers = users.filter(user => user.ReceivedMessages.length > 0 || user.SentMessages.length > 0);
    res.send(filteredUsers);
  })
  .catch(error => {
    console.error('Error fetching chat overview:', error);
  });
}

exports.getUserName = async(req, res) => {
  try {
    const user = await User.findByPk(req.params.uid, {attributes: ['name']});
    res.json(user.name);
  } catch (error) {
    res.status(500).send(error.toString());
  }
}
