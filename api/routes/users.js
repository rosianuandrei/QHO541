const express = require('express');
const usersModel = require('../models/users');
const router = express.Router()

router.use(express.json());

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const createUser = async (req, res) => {
    let result = await usersModel.addUser(req.body);
    if (result) {
        return res.status(200).json('User registered sucessfully');
    }
}

router.post('/', createUser);

module.exports = router; 