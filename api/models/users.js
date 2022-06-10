const db = require('../helpers/database');
const bcrypt = require('bcrypt');

const addUser = async (user) => {
    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, async function(err, hash) {
        user.password = hash;
        user.passwordsalt = saltRounds;
        let result = await db.insert(user).into('users').returning('*').catch((err) => err);
        return result;
    });
}

const getAll = async () => {
    let result = await db.select(['id', 'firstname', 'lastname', 'username', 'dateregistered', 'role']).from('users');
    return result;
}

const getById = async (id) => {
    let result = await db.select(['id', 'firstname', 'email', 'lastname', 'username', 'dateregistered', 'role']).from('users').where('id', '=', id);
    return result;
}

const updateUser = async (user, id) => {
    if (user.password.length) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(user.password, saltRounds);
        user.password = hash;
        let result = await db('users').update(user).where('id', '=', id).returning(['id', 'firstname', 'lastname', 'username', 'dateregistered', 'role']);
        return result;
    } else {
        let result = await db('users').update(user).where('id', '=', id).returning(['id', 'firstname', 'lastname', 'username', 'dateregistered', 'role']);
        return result;
    }
}

const deleteUser = async (id) => {
    let result = await db('users').del().where('id', '=', id);
    console.log(result);
    return result;
}

const findByUsername = async (username) => {
    let result = await db.select('*').from('users').where('username', '=', username).transacting(trx);
    return result;
}

const getApplicationsByUser = async (id) => {
    let result = await db('applications').join('users', 'applications.userid', '=', 'users.id').select('applications.*', 'users.firstname', 'users.lastname', 'users.role', 'users.username').where('applications.userid', '=', id).catch((err) => err);
    return result;
}




module.exports = {addUser, getAll, getById, updateUser, deleteUser, findByUsername, getApplicationsByUser}; 