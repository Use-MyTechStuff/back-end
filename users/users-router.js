const jwt = require("jsonwebtoken")
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const Users = require("./users-model")

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
            res.status(500).json({ err: "Incorrect credentials" })
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
                res.status(401).json({ message: "Invalid Credentials" })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// 

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