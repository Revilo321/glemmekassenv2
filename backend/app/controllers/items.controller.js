const db = require('../models')
const LostItem = db.lostitem
const Op = db.Sequelize.Op

exports.findItems = async (req, res) => {
  try {
    const { type } = req.query
    let items
    if (type === 'lost') {
      items = await LostItem.findAll()
    } else if (type === 'found') {
    }
    res.send(items)
  } catch (error) {
    console.error('Error fetching messages:', error)
    res.status(500).send(error)
  }
}

exports.createLostItem= async(req, res) => {
    const lostItem = await LostItem.create(req.body);
    res.status(201).json(lostItem);
}
