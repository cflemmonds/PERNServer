const router = require('express').Router
const {UserModel} = require("../models")

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10),
        })
        const token = jwt.sign({
            id: newUser.id},
            process.env.JWT_SECRET_KEY,
            {expiresIn: 60 * 60 * 24}
        )
            

        res.status(201).json({
            message: "User created",
            user: newUser,
            token
        })
    } catch (err) {
        // console.log(err)
        // res.status(500).json({
        // error: err
    // })
        if (err.name === "SequelizeUniqueConstraintError"){
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                message: "You done messed up and I don't know where."
            })
        }

    }
})

router.post("/login")





module.exports= router;