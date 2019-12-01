var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req,res) => {
    res.json("I'm here now")
});

module.exports = router;
