const db = require('../models')
const Item = db.items
const Op = db.Sequelize.Op

exports.findItems = async (req, res) => {
  try {
    console.log(req.query)
    const { zipcode } = req.query;
    let whereCondition = {};

    if (zipcode) {
      const zipcodes = zipcode.split(',');
      whereCondition.zipcode = zipcodes.length > 1 ? { [Op.in]: zipcodes } : zipcode;
    }

    const items = await Item.findAll({
      where: whereCondition
    });

    res.send(items);
  } catch (error) {
    console.error('Error fetching items', error);
    res.status(500).send('An error occurred while fetching items');
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, location, zipcode, dateTime, description, itemType, name, uid, imageUrl } = req.body;
    
    const newItem = await Item.create({
      title,
      location,
      zipcode,
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