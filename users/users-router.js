const jwt = require("jsonwebtoken")
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const Users = require("./users-model")
const restricted = require("../middlewares/restricted")

// User registration
router.post("/register", (req, res) => {
    const user = req.body
    const hash = bcrypt.hashSync(user.password)
    user.password = hash

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err: "Incorrect credentials!" })
        })
})

// User login
router.post("/login", (req, res) => {

    const { username, password } = req.body

    Users.findBy({ username }).first()
        .then(user => {
            console.log(user)

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)

                res.status(200).json({ token, user })
            }
            else {
                res.status(401).json({ message: "Invalid Credentials!" })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Retrieve list of users
router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to get users!" })
        })
})

// Retrieve list of item by user id
router.get("/:id/items", restricted, (req, res) => {
    const { id } = req.params

    Users.findUserItems(id)
        .then(items => {
            res.json(items)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "There was an error getting user items" })
        })
})

// Retrieve users by id
router.get("/:id", restricted, (req, res) => {
    const { id } = req.params

    Users.findById(id)
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed to get user!" })
        })
})

// Post a new user item
router.post("/:id/items", restricted, (req, res) => {
    const { id } = req.params

    req.body.user_id = req.params.id

    Users.addItemToUser(id, req.body)
        .then(newItem => {
            res.status(201).json(newItem)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Failed adding an item!" })
        })
})

// Delete a user
router.delete("/:id", restricted, (req, res) => {
    Users.deleteUser(req.params.id)
        .then(() => {
            res.json({ message: `User deleted!` })
        })
        .catch(err => {
            res.status(500).json({ message: "Couldn't delete the user!" })
        })
})

// Token generator
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router