const express = require("express");
const router = express.Router();
const { items } = require("../data/db");
/**
* GET /api/items
* Recupera tutti gli elementi
*/
router.get("/", (req, res) => {
res.json(items);
});

/**
* GET /api/items/:id
* Recupera un elemento per ID
*/
router.get("/:id", (req, res) => {
const id = parseInt(req.params.id);
const item = items.find(i => i.id === id);
if (!item) {
return res.status(404).json({ message: "Elemento non trovato" });
}
res.json(item);
});
/**
* POST /api/items
* Crea un nuovo elemento
*/
router.post("/", (req, res) => {


    const { name } = req.body;

    const newId = items.length > 0 ? items[items.length - 1].id + 1 : 1;

        // creare un nuovo oggetto
        const newItem = {
            id: newId,
            name: name
        };

        // aggiungerlo all'array
        items.push(newItem);

        res.status(201).json(newItem);
});
/**
* PUT /api/items/:id
* Modifica un elemento
*/
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    const { name } = req.body;

    item.name = name;

    res.json(item);
});
/**
* DELETE /api/items/:id

* Elimina un elemento
*/
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);
   const index = items.findIndex(i => i.id === id);

    const deletedItem = items.splice(index, 1);

    res.json({
        message: "Elemento eliminato",
        item: deletedItem[0]
    });
});
module.exports = router;