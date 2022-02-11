const router = require('express').Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    try {
        await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13)
        });

        let token = jwt.sign({ id: UserModel.id }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: "User successfully registered",
            user: UserModel,
            sessionToken: token
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            })
        } else {
            res.status(500).json({
                message: "Failed to register user",
            })
        }
    }
})

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email
            }
        })

        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);

            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })
                res.status(200).json({
                    user: loginUser,
                    message: "Login successful",
                    sessionToken: token
                })
            } else {
                res.status(401).json({
                    message: "Incorrect email or password",
                })
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to login",
        })
    }

})

module.exports = router;