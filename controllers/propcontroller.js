const Express = require('express');
const router = Express.Router();
const { PropertyModel } = require("../models")

router.get("/", async (req, res) => {
    try {
        const allProperty = await PropertyModel.findAll()
        console.log(allProperty)

        res.status(200).json(allProperty)

    } catch(err) {

        res.status(500).json({
            error: err
        })

    }
})

router.post("/create", async (req, res) => {

    try {
        const createProperty = await PropertyModel.create({
            category: req.body.category,
            name: req.body.name,
            year: req.body.year,
            model: req.body.model,
            serial: req.body.serial,
            imgURL: req.body.imgURL,
            value: req.body.value,
            ownerID: req.body.ownerID
        })

        console.log(createProperty)

        res.status(201).json({
            message: "Property successfully created",
            createProperty
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to create property ${err}`
        })
    }
})

router.put("/:id", async (req, res) => {
    const {
        category,
        name,
        year,
        model,
        serial,
        imgURL,
        value,
        ownerID
    } = req.body

    try {
        await PropertyModel.update(
            { category, name, year, model, serial, imgURL, value, ownerID }, 
            { where: { id: req.params.id }, returning: true }
        )
        .then((result) => {
            res.status(200).json({
                message: "Property successfully updated.",
                updatedProperty: result
            })
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to update property ${err}`
        })
    }
})

router.delete("/:id", async (req, res) => {

    try {
        await PropertyModel.destroy({
            where: { id: req.params.id }
        })
        
        res.status(200).json({
            message: "Property deleted",
        })
        
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete property ${err}`
        })
    }
})


module.exports = router;