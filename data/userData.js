const database = require('../database')

const getCustomers = async () => {
    const clientes = await database.selectCustomers()
    return clientes[0];
}

const getCustomer = async (customerId) => {
    const cliente = await database.selectCustomer(customerId)
    return cliente[0];
}

const getCustomerByEmail = async (customerEmail) => {
    const cliente = await database.selectCustomerByEmail(customerEmail)

    return cliente;
}

const updateCustomer = async (customerId, customer) => {
    const update = await database.updateCustomer(customerId, customer)
    return update[0];
}

const updateCustomerPassword = async (customerId, password) => {
    const update = await database.updateCustomerPassword(customerId, password)
    return update[0];
}

const addCustomer = async (customer) => {
    const result = await database.insertCustomer(customer)
    return result[0];
}

const deleteCustomer = async (customerId) => {
    const result = await database.deleteCustomer(customerId)
    return result[0];
}

module.exports = { getCustomers, getCustomer, getCustomerByEmail, addCustomer, updateCustomer, updateCustomerPassword, deleteCustomer }