const express = require('express');
const usersModel = require('../models/users');
const router = express.Router()

router.use(express.json());

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const createUser = async (req, res) => {
    let result = await usersModel.addUser(req.body).catch((err) => console.log(err));
    if (result) {
        return res.status(200).json('User registered sucessfully');
    }
}

const getAll = async (req, res) => {
    let result = await usersModel.getAll().catch((err) => console.log(err));
    if (Array.isArray(result) && result.length) {
        return res.status(200).json(result);
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json('No user found');
    } else {
        return res.status(500).json('Error was found');
    }
}

const getById = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.getById(id).catch((err) => console.log(err));
    console.log(result);
    if (Array.isArray(result) && result.length) {
        return res.status(200).json(result);
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json('No user found');
    } else {
        return res.status(500).json('Error was found');
    }
}

const updateUser = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.updateUser(req.body, id).catch((err) => console.log(err));
    if (result === 1) {
        return res.status(200).json('User updated succesfully');
    } else {
        return res.status(400).json('Error updating user');
    }
}

router.get('/:id', getById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/', getAll);

module.exports = router; 