const express = require('express');
const usersModel = require('../models/users');
const auth = require('../controllers/auth');
const router = express.Router()
const {validateUser, validateUserUpdate} = require('../controllers/validation');
const can = require('../permissions/users');
const cors = require('cors');

router.use(express.json());

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

const createUser = async (req, res) => {
    let result = await usersModel.addUser(req.body);
    console.log(result);
    return res.status(200).json('User created succesfully');
}

const getAll = async (req, res) => {
    const permission = can.readAll(req.user);
    console.log(permission);
    if (!permission.granted) {
        res.status(403).json("You don't have permission");
    } else {
        let result = await usersModel.getAll().catch((err) => console.log(err));
        if (Array.isArray(result) && result.length) {
            return res.status(200).json(result);
        } else if (Array.isArray(result) && result.length === 0) {
            return res.status(404).json('No user found');
        } else {
            return res.status(500).json('Error found when getting users');
        }
    }
}

const getById = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.getById(id).catch((err) => console.log(err));

    if (Array.isArray(result) && result.length) {
        const data = result[0];
        let permission = can.read(req.user, data);
        if (!permission.granted) {
            res.status(403).json("You don't have permission");
        } else {
            return res.status(200).json(result);
        } 
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
        let data = result[0];
        const permission = can.update(req.user, data);
        if (!permission.granted) {
            res.status(403).json("You don't have permission");
        } else {
            return res.status(200).json(result);
        }
    } else if (result === undefined) {
        console.log(result);
        return res.status(500).json('Error when updating the user');
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(400).json('No user found to update');
    }
}

const deleteUser = async (req, res) => {
    let { id } = req.params;
    let result = await usersModel.getById(id);
    if (result.length) {
        const data = result[0];
        console.log('trying to delete', data);
        const permission = can.delete(req.user, data);
        if (!permission.granted) {
            res.status(403).json("You don't have permission");
        } else {
            let result = await usersModel.deleteUser(id).catch((err) => console.log(err));
            if (result) {
                return res.status(200).json('User deleted succesfully');
            } else if (result === undefined) {
                return res.status(500).json('Error when deleting a user');
            } else {
                return res.status(400).json('No user found to delete');
            }
        }
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

const login = async (req, res) => {
    const {id, username, email, role, firstname, dateregistered, lastname} = req.user;
    const links = {
        self: `${req.protocol}://${req.host}:3000/api/users/${id}`,
        applications: `${req.protocol}://${req.host}:3000/api/users/${id}/applications`
    }
    res.json({id, username, email, role, firstname, lastname, dateregistered, links})
}


router.get('/:id', auth, getById);
router.post('/', validateUser, createUser);
router.post('/login', auth, login);
router.put('/:id', validateUserUpdate, auth, updateUser);
router.get('/', auth, getAll);
router.delete('/:id', auth, deleteUser);
router.get('/:id/applications', auth, getApplicationsByUser)

module.exports = router; 