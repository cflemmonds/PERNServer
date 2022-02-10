const Express = require('express')
const app = Express()
const dbConnection = require("./db")

// app.use('/test', (req, res) => {
//     res.send('This is message from the test endpoint on the server!')
// })

const controllers = require("./controllers");

app.use("/prop", controllers.propController)
app.use("/user", controllers.userController)

app.listen(4000, () => {
    console.log(`[Server]: App is listening on 4000.`)
})

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening on 4000.`)
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err} `)
    })