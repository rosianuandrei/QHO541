const express = require('express');
const usersModel = require('../models/users');
const auth = require('../controllers/auth');
const router = express.Router()
const {validateUser, validateUserUpdate} = require('../controllers/validation');

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
    if (Array.isArray(result) && result.length) {
        result[0].password = '';
        return res.status(200).json(result);
    } else if (result === undefined) {
        return res.status(500).json('Error when updating the user');
    } else if (Array.isArray(result) && result.length === 0) {
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

const getApplicationsByUser = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.getApplicationsByUser(id)
    if (Array.isArray(result) && result.length) {
        return res.status(200).json(result);
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json('No applications found on this user');
    } else {
        return res.status(500).json('Error found when getting applications by user ID');
    }
}


router.get('/:id', auth, getById);
router.post('/', validateUser, createUser);
router.put('/:id', validateUserUpdate, auth, updateUser);
router.get('/', auth, getAll);
router.delete('/:id', auth, deleteUser);
router.get('/:id/applications', auth, getApplicationsByUser)

module.exports = router; 