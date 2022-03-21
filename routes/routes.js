const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const orderController = require('../controllers/orderController')

router.get('/user', userController.getCustomers)

router.get('/user/:id', userController.getCustomer)

router.get('/order/:id', orderController.getOrderById)

router.get('/order', orderController.getOrders)

router.get('/order/month/:month', orderController.getOrdersLastMonth)

router.put('/order/:id', orderController.updateOrder)

router.put('/order/status/:id', orderController.updateOrderStatus)

router.put('/user/:id', userController.updateCustomer)

router.post('/user', userController.addCustomer)

router.post('/user/email', userController.CustomerByEmail)

router.post('/order', orderController.addOrder)

router.post('/order/cancel/:id', orderController.cancelOrder)

router.post('/authentication/login', authController.loginCustomer)

router.post('/authentication/register', authController.registerCustomer)

router.delete('/user/:id', userController.deleteCustomer)

module.exports = { routes: router }