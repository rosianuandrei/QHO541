const express = require('express');
const usersModel = require('../models/users');
const router = express.Router()

router.use(express.json());

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const createUser = async (req, res) => {
    let result = await usersModel.addUser(req.body).catch(err => res.status(400).json('Error registering the user'));
    if (result) {
        return res.status(200).json('User registered sucessfully');
    }
}

const getAll = async (req, res) => {
    let result = await usersModel.getAll().catch(err => res.status(400).json('Error getting list of users'));
    if (result.length) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json('No users found');
    }
}

const getById = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.getById(id).catch(err => res.status(400).json('Error getting a user'));
    if (result.length) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json('No user found');
    }
}

router.get('/:id', getById);
router.post('/', createUser);
router.get('/', getAll);

module.exports = router; 