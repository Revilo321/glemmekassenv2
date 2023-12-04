const db = require('../models')
const User = db.user;
const Message = db.message;
const Op = db.Sequelize.Op;

exports.getConversation = async(req, res) => {
    try {
        const { currentUserUid, otherUserUid } = req.params;
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: currentUserUid, receiverId: otherUserUid },
                    { senderId: otherUserUid, receiverId: currentUserUid }
                ]
            },
            include: [
                { model: User, as: 'Sender', attributes: ['uid', 'name'] },
                { model: User, as: 'Receiver', attributes: ['uid', 'name'] }
            ],
            order: [['createdAt', 'ASC']]
        });
        res.send(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).send(error);
    }
}