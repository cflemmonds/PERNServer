const Express = require('express');
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('Hey, have a drink!')
});

// router.post("/prop")

// router.post("/prop/create")

module.exports = router;