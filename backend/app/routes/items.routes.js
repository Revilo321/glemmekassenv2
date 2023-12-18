module.exports = app => {
    const items = require("../controllers/items.controller.js")
    
    var router = require("express").Router();

    router.get("/", items.findItems);
    router.post("/", items.createItem)
    router.get("/user/:uid", items.findItemByUid)
    router.put("/:id", items.updateItem)
    router.delete("/:id",items.deleteItem)
    app.use('/api/items', router);
};