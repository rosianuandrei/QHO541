const express = require('express');
const applicationsModel = require('../models/applications');
const router = express.Router()

router.use(express.json());

const createApplication = async (req, res) => {
    let result = await applicationsModel.addApplication(req.body);
    console.log(result);
    if (Array.isArray(result)) {
        return res.status(200).json(result);
    } else if (result.severity === 'ERROR') {
        return res.status(500).json('An error occurred when trying to add an applicaiton');
    }
}

const getAllApplications = async (req, res) => {
    let result = await applicationsModel.getAll().catch((err) => console.log(err));
    if (Array.isArray(result) && result.length) {
        return res.status(200).json(result);
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json('No applications found');
    } else {
        return res.status(500).json('An error occurred when trying to get applications');
    }
}

const getByIdApplications = async (req, res) => {
    let { id } = req.params;
    let result = await applicationsModel.getById(id).catch((err) => console.log(err));
    if (Array.isArray(result) && result.length) {
        return res.status(200).json(result);
    } else if (Array.isArray(result) && result.length === 0) {
        return res.status(404).json(`No applications found with this ID = ${id}`);
    } else {
        return res.status(500).json(`Error found when getting applications by ID = ${id}`);
    }
}

router.post('/', createApplication);
router.get('/', getAllApplications);
router.get('/:id', getByIdApplications);

module.exports = router;