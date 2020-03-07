const express = require('express');
const router = express.Router();

//@route GET api/test
//@desc  Test post route

router.get('/test', (req,res) => res.json({msg:'Posts works!'}));

module.exports = router;