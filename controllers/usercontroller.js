const router = require('express').Router();
const { UserModel } = require("../models")

router.post("/register", async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    await UserModel.create({
        firstName: "test",
        lastName: "testerson",
        email: "test@testagain.com",
        password: "testingme"
    });
    res.send("This is our user/register endpoint!")
})

module.exports = router;