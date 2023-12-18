const db = require('../models')
const Item = db.items
const Op = db.Sequelize.Op

exports.findItems = async (req, res) => {
  try {
    const { zipcode } = req.query;
    let whereCondition = {};

    if (zipcode) {
      const zipcodes = zipcode.split(',');
      whereCondition.zipcode = zipcodes.length > 1 ? { [Op.in]: zipcodes } : zipcode;
    }

    const items = await Item.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']]
    });

    res.send(items);
  } catch (error) {
    console.error('Error fetching items', error);
    res.status(500).send('An error occurred while fetching items');
  }
};

exports.createItem = async (req, res) => {
  try {
    const { title, city, zipcode, dateTime, description, itemType, name, uid, imageUrl } = req.body;
    
    const newItem = await Item.create({
      title,
      location: city,
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

exports.findItemByUid = async (req, res) => {
  try {
    const items = await Item.findAll({
      where: {userUid: req.params.uid},
      order: [['createdAt', 'DESC']]
    });
    res.send(items);
  } catch (error) {
    console.error('Error fetching items', error);
    res.status(500).send('An error occurred while fetching items');
  }
};

exports.updateItem = async (req, res) => {
  try {
    await Item.update(req.body, {
      where: {id: req.body.id}
    })
    res.status(200).send();
  } catch (error) {
    console.error("Error while updating items", error);
    res.status(500).send('An error occurred while updating items');
  }
}
exports.deleteItem = async (req, res) => {
  console.log(req.params)
  try {
    await Item.destroy({
      where: {id: req.params.id}
    })
    res.status(200).send();
  } catch (error) {
    console.error("Error while deleting item", error);
    res.status(500).send('An error occurred while updating item');
  }
}