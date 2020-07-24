const router = require("express").Router()
const Items = require("./items-model")
const restricted = require("../middleware/restricted")

// Retrieve list of items
router.get("/", restricted, (req, res) => {
    Items.allItems()
        .then(items => {
            res.json(items)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to get items!" })
        })
})

// Retrieve item by id
router.get("/:id", restricted, (req, res) => {
    Items.findItemById(req.params.id)
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to get items!" })
        })
})

// Post new item
router.post("/", restricted, (req, res) => {
    Items.add(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to add the item!" })
        })
})

// Update an item
router.put("/:id", restricted, (req, res) => {
    Items.update(req.params.id, req.body)
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to update the item!" })
        })
})

// Delete an item
router.delete("/:id", restricted, (req, res) => {
    Items.deleteItem(req.params.id)
        .then(() => {
            res.json({ message: "Item deleted!" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to delete the item!" })
        })
})

module.exports = router