const db = require("../database/dbConfig")

function add(item) {
    return db("items").insert(item, "id")
        .then(([id]) => {
            return findItemById(id)
        })
}

function update(id, changes) {
    return db("items").where({ id }).update(changes)
}

function allItems() {
    return db("items")
}

function findItemById(id) {
    return db("items").where({ id }).first()
}

function deleteItem(id) {
    return findItemById(id).del(id)
}

module.exports = {
    add,
    update,
    allItems,
    findItemById,
    deleteItem
}