const db = require('../helpers/database');

const addApplication = async (application) => {
    let result = await db.insert(application).into('applications').returning('*').catch((err) => err);
    console.log(result);
    return result;
}

module.exports = {addApplication};