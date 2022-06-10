const express = require('express');
const applicationsModel = require('../models/applications');
const router = express.Router()

router.use(express.json());

router.get('/', (req, res) => {
    return res.status(200).json('Application route is working');
})

module.exports = router;