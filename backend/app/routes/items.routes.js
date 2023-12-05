module.exports = app => {
    const items = require("../controllers/items.controller.js")
    
    var router = require("express").Router();

    router.get("/", items.findItems);
    router.post("/lostitems", items.createLostItem)
    app.use('/api/items', router);
};