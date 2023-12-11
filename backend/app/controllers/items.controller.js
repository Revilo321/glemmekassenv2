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

exports.createItem = async (req, res) => {
  try {
    const { title, location, dateTime, description, itemType, name, uid, imageUrl } = req.body;
    
    const newItem = await Item.create({
      title,
      location,
      dateTime,
      description,
      itemType, 
      name,
      userUid: uid,
      imageUrl
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: error.message || 'An error occurred while creating the item.' });
  }
};
