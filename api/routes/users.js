const express = require('express');
const router = express.Router()

router.use(express.json());

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', (req, res) => {
    return res.status(200).json('ok');
})

module.exports = router; 