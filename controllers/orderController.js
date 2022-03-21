const orderData = require('../data/orderData')

const getOrders = async (request, response) => {
    try {
        let retorno = await orderData.getOrders()
        return response.json(retorno)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const getOrdersLastMonth = async (request, response) => {
    try {
        let retorno = await orderData.getOrdersLastMonth(request.params.month)
        return response.json(retorno)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const getOrderById = async (request, response) => {
    try {
        let retorno = await orderData.getOrderById(request.params.id)
        return response.json(retorno)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const addOrder = async (request, response) => {
    try {
        const result = await orderData.addOrder(request.body)

        return response.json(result)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const updateOrder = async (request, response) => {
    try {
        const result = await orderData.updateOrder(request.params.id, request.body)

        return response.json(result)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const updateOrderStatus = async (request, response) => {
    try {
        const result = await orderData.updateOrderStatus(request.params.id, request.body)

        return response.json(result)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const cancelOrder = async (request, response) => {
    try {
        const result = await orderData.cancelOrder(request.params.id)

        return response.json(result)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

module.exports = { getOrders, getOrdersLastMonth, getOrderById, addOrder, updateOrder,
    updateOrderStatus, cancelOrder }