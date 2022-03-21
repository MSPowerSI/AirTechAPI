const database = require('../database')

const loginCustomer = async (credentials) => {
    const result = await database.loginUser(credentials)
    return result[0];
}

module.exports = { loginCustomer }