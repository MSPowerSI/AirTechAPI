const orderData = require('../data/orderData')

const getOrders = async (request, response) => {
    try {
        let retorno = await orderData.getOrders()
        return response.json(retorno)
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

const getOrdersLastMonth = async (request, response) => {
    try {
        let retorno = await orderData.getOrdersLastMonth(request.params.month)
        return response.json(retorno)
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

const getOrderById = async (request, response) => {
    try {
        let retorno = await orderData.getOrderById(request.params.id)
        return response.json(retorno)
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

const addOrder = async (request, response) => {
    try {
        const result = await orderData.addOrder(request.body)

        return response.json(result)
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

const updateOrder = async (request, response) => {
    try {
        const updated = await orderData.updateOrder(request.params.id, request.body)

        return response.json(updated)
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

const updateOrderStatus = async (request, response) => {
    try {
        const updated = await orderData.updateOrderStatus(request.params.id, request.body)

        return response.json(updated)

    } catch (error) {
        return response.status(400).send(error.message)
    }
}

const cancelOrder = async (request, response) => {
    try {
        const cancel = await orderData.cancelOrder(request.params.id)

        return response.json(cancel)
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

module.exports = {
    getOrders,
    getOrdersLastMonth,
    getOrderById,
    addOrder,
    updateOrder,
    updateOrderStatus,
    cancelOrder
}