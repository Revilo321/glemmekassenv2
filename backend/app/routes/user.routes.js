module.exports = app => {
    const user = require("../controllers/user.controller.js")
    
    var router = require("express").Router();

    router.post("/", user.create);
    router.get("/chats/:id", user.findChats)
    app.use('/api/user', router);
};