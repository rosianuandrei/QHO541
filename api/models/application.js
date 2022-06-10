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

const getById = async (id) => {
    let result = await db.select('*').from('applications').where('id', '=', id);
    return result;
}

const deleteById = async (id) => {
    let result = await db('applications').del().where('id', '=', id);
    return result;
}

const updateApplication = async (application, id) => {
    let result = await db('applications').update(application).where('id', '=', id).returning('*');
    return result;
}

const getApplicationsByUser = async (id) => {
    let result = await db('applications').join('users', 'applications.userid', '=', 'users.id').select('applications.*', 'users.firstname', 'users.lastname').where('applications.userid', '=', id).catch((err) => err);
    return result;
}


module.exports = {addUser, getAll, getById, updateUser, deleteUser, getApplicationsByUser};