require('dotenv').config();

async function connect() {
    if(global.connection && !(global.connection.connection._closing))
        return global.connection;

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection(`mysql://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.IP_DB}/airtech`)
    console.log("Conectado ao Banco de dados MySQL!")
    global.connection = connection;
    return connection;
}

connect()

async function selectCustomers() {
    const conn = await connect();
    return await conn.query('SELECT * FROM customers')
}

async function selectCustomer(customerId) {
    const conn = await connect();
    const sql = 'SELECT * FROM customers WHERE id=? LIMIT 1'
    const values = [customerId]
    return await conn.query(sql, values)
}

async function selectCustomerByEmail(email) {
    const conn = await connect();
    const [rows] = await conn.query(`SELECT * FROM customers WHERE email=? LIMIT 1`, [email]);
    if (rows.length > 0)
        return rows[0];
    else return null;
}

async function insertCustomer(customer) {
    const conn = await connect();
    const sql = 'INSERT INTO customers(taxIdNumber, firstName, lastName, birthDate, genre, phoneNumber, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
    const values = [customer.taxIdNumber, customer.firstName, customer.lastName, customer.birthDate, customer.genre, customer.phoneNumber, customer.email, customer.password]
    return await conn.query(sql, values)
}

async function updateCustomer(id, customer) {
    const conn = await connect();
    const sql = 'UPDATE customers SET firstName=?, lastName=?, birthDate=?, genre=?, phoneNumber=?, email=? WHERE id=?;'
    const values = [customer.firstName, customer.lastName, customer.birthDate, customer.genre, customer.phoneNumber, customer.email, id]
    return await conn.query(sql, values)
}

async function updateCustomerPassword(id, password) {
    const conn = await connect();
    const sql = 'UPDATE customers SET senha=? WHERE id=?;'
    const values = [password, id]
    return await conn.query(sql, values)
}

async function deleteCustomer(id) {
    const conn = await connect();
    const sql = 'UPDATE customers set active = 0 WHERE id=?;'
    const values = [id]
    return await conn.query(sql, values)
}

async function selectCustomers() {
    const conn = await connect();
    return await conn.query('SELECT * FROM customers')
}

async function getOrdersLastMonth(month) {
    const conn = await connect();
    const sql = `SELECT * FROM orders WHERE DATA LIKE "%/?/%";`
    const values = [parseInt(month)]
    return await conn.query(sql, values)
}

async function getOrders() {
    const conn = await connect();
    const sql = 'SELECT * FROM orders ORDER BY Id'
    return await conn.query(sql)
}

async function OrderById(id) {
    const conn = await connect();
    const sql = 'SELECT * FROM orders WHERE id=?;'
    const values = [id]
    return await conn.query(sql, values)
}

async function insertOrder(order) {
    const conn = await connect();
    const sql = 'INSERT INTO orders(customer_id, agency_id, paid, total_price) VALUES (?, ?, ?, ?);'
    const values = [order.customer_id, order.agency_id, order.paid, order.total_price]
    return await conn.query(sql, values)
}

async function updateOrder(id, order) {
    const conn = await connect();
    const sql = 'UPDATE orders SET customer_id=?, agency_id=?, paid=?, total_price=? WHERE id=?;'
    const values = [order.customer_id, order.agency_id, order.paid, order.total_price, id]
    return await conn.query(sql, values)
}

async function updateOrderStatus(id, order) {
    const conn = await connect();
    const sql = 'UPDATE orders SET status=? WHERE id=?;'
    const values = [order.status, id]
    return await conn.query(sql, values)
}

async function cancelOrder(id) {
    const conn = await connect();
    const sql = 'UPDATE orders SET status=? WHERE id=?;'
    const values = ["Cancelado", id]
    return await conn.query(sql, values)
}


module.exports = { selectCustomers, selectCustomer, selectCustomerByEmail, insertCustomer, updateCustomer, updateCustomerPassword, deleteCustomer, 
    getOrdersLastMonth, getOrders, updateOrderStatus, cancelOrder, OrderById, insertOrder, updateOrder }
