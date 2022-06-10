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

const getAll = async (req, res) => {
    let result = await usersModel.getAll();
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json('No users found');
    }
}

router.post('/', createUser);
router.get('/', getAll);

module.exports = router; 