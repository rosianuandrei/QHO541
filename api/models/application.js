const db = require('../helpers/database');

const addApplication = async (application) => {
    let result = await db.insert(application).into('applications').returning('*').catch((err) => err);
    return result;
}

const getAll = async () => {
    let result = await db.select('*').from('applications');
    console.log(result);
    return result;
}

module.exports = {addApplication, getAll};