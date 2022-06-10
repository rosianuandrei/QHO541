const db = require('../helpers/database');

const addUser = async (user) => {
        let result = await db.insert(user).into('users');
        return result;
}

const getAll = async () => {
    let result = await db.select('*').from('users');
    return result;
}


module.exports = {addUser, getAll}; 