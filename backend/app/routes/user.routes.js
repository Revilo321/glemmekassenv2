module.exports = app => {
    const user = require("../controllers/user.controller.js")
    
    var router = require("express").Router();

    router.post("/", user.create);
    router.get('/name/:uid', user.getUserName)
    router.get("/chats/:id", user.findChats)
    router.get("/:id", user.getUser);
    app.use('/api/user', router);
   
};