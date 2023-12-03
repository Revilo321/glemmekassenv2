module.exports = app => {
    const message = require("../controllers/messages.controller.js")
    
    var router = require("express").Router();

    router.get("/:currentUserUid/:otherUserUid", message.getConversation)
    app.use('/api/messages', router);
};