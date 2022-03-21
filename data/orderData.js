const database = require('../database')

const getOrders = async () => {
    const result = await database.getOrders()
    return result[0];
}

const getOrdersLastMonth = async (month) => {
    const result = await database.getOrdersLastMonth(month)
    return result[0];
}

const getOrderById = async (orderId) => {
    const result = await database.OrderById(parseInt(orderId))
    return result[0];
}

const addOrder = async (order) => {
    const insert = await database.insertOrder(order.order)

    const result = await database.OrderById(insert[0].insertId)
    
    return result[0];
}

const updateOrder = async (orderId, order) => {
    const update = await database.updateOrder(orderId, order)
    return update[0];
}

const updateOrderStatus = async (orderId, order) => {
    const update = await database.updateOrderStatus(orderId, order)
    return update[0];
}

const cancelOrder = async (orderId) => {
    const cancel = await database.cancelOrder(orderId)
    return cancel[0];
}

module.exports = { getOrders, getOrdersLastMonth, getOrderById, addOrder, updateOrder,
    updateOrderStatus, cancelOrder }