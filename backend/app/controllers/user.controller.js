const db = require('../models')
const User = db.user

exports.create = (req, res) => {
  console.log(req.body)
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
