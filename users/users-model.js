const db = require("../database/dbConfig")

function find() {
    return db("users").select("id", "username")
}

function findBy(filter) {
    return db("users").where(filter)
}

function findById(id) {
    return db("users").where({ id }).first()
}

async function add(user) {
    const [id] = await db("users").insert(user)

    return findById(id)
}

function getAllItems() {
    return db("items")
}

function findItemById(id) {
    return db("items").where({ id }).first()
}

function findUserItems(userId) {
    return db("items as i")
        .join("users as u", "u.id", "i.user_id")
        .select("i.id", "i.name", "i.description", "i.availability", "i.daily_rate", "i.condition", "i.location")
        .where("i.user_id", userId)
}

function addItemToUser(userId, payload) {
    return db("items as i")
        .join("users as u", "u.id", "i.user_id")
        .insert(payload)
        .select("*")
        .where(userId, payload.user_id)
}

function deleteUser(id) {
    return findById(id).del(id)
}

module.exports = {
    find,
    findBy,
    findById,
    findItemById,
    findUserItems,
    getAllItems,
    add,
    addItemToUser,
    deleteUser,
}