const express = require('express');
const router = express.Router();

router.post('/FoodData', (req, res) => {
    try {
        res.send([global.FoodData, global.foodCategory])
        console.log(global.FoodData)
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
})
module.exports = router;