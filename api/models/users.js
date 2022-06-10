const db = require('../helpers/database');

const addUser = async (user) => {
        let result = await db.insert(user).into('users');
        return result;
}

const getAll = async () => {
    let result = await db.select('*').from('users');
    return result;
}

const getById = async (id) => {
    let result = await db.select('*').from('users').where('id', '=', id);
    return result;
}



module.exports = {addUser, getAll, getById}; 