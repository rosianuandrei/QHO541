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
    if (Array.isArray(result)) {
        result[0].password = '';
        return res.status(200).json(result);
    } else if (result.severity === 'ERROR') {
        return res.status(500).json('User Exist or BAD REQUEST');
    }
}

const getAll = async (req, res) => {
    let result = await usersModel.getAll().catch((err) => console.log(err));
    if (Array.isArray(result) && result.length) {
        result[0].password = '';
        return res.status(200).json(result);
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json('No user found');
    } else {
        return res.status(500).json('Error found when getting users');
    }
}

const getById = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.getById(id).catch((err) => console.log(err));

    if (Array.isArray(result) && result.length) {
        result[0].password = '';
        return res.status(200).json(result);
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json('No user found');
    } else {
        return res.status(500).json('Error found when getting User by ID');
    }
}

const updateUser = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.updateUser(req.body, id).catch((err) => console.log(err));
    if (result === 1) {
        return res.status(200).json('User updated succesfully');
    } else if (result === undefined) {
        return res.status(500).json('Error when updating the user');
    }
    else {
        return res.status(400).json('No user found to update');
    }
}

const deleteUser = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.deleteUser(id).catch((err) => console.log(err));
    if (result) {
        return res.status(200).json('User deleted succesfully');
    } else if (result === undefined) {
        return res.status(500).json('Error when deleting a user');
    } else {
        return res.status(400).json('No user found to delete');
    }
}

router.get('/:id', getById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/', getAll);
router.delete('/:id', deleteUser);

module.exports = router; 