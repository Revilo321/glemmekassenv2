const db = require('../models')
const Item = db.items
const Op = db.Sequelize.Op

exports.findItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    console.error('Error fetching items:', error)
    res.status(500).send(error)
  }
}

exports.createLostItem= async(req, res) => {
    const lostItem = await Item.create(req.body);
    res.status(201).json(lostItem);
}
