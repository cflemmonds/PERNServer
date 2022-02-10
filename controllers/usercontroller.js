const router = require('express').Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");


router.post("/register", async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    try {
        await UserModel.create({
            firstName,
            lastName,
            email,
            password
        });
        res.status(201).json({
            message: "User successfully registered",
            user: UserModel
        })
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "Failed to register user",
        })
    }

})

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {

        let loginUser = await UserModel.findOne({
            where: {
                email,
            }
        })

        if (loginUser) {
            res.status(200).json({
                message: "Login successful",
                user: loginUser
            })
        } else {
            res.status(401).json({
                message: "Failed to login",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to login",
        })
    }

})

module.exports = router;