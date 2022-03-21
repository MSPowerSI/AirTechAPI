const userData = require('../data/userData')


const getCustomers = async (request, response) => {
    try {
        const clientes = await userData.getCustomers()
        return response.json(clientes)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const getCustomer = async (request, response) => {
    try {
        const cliente = await userData.getCustomer(request.params.id)

        let usuario = { 
            Id: cliente[0].Id,
            taxIdNumber: cliente[0].taxIdNumber,
            firstName: cliente[0].firstName,
            lastName: cliente[0].lastName,
            birthDate: cliente[0].birthDate,
            genre: cliente[0].genre,
            phoneNumber: cliente[0].phoneNumber,
            email: cliente[0].email,
            active: cliente[0].active
        }
        
        return response.json(usuario)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const CustomerByEmail = async (request, response) => {
    try {
        const cliente = await userData.getCustomerByEmail(request.body.email, true)

        if (cliente) { 
            let usuario = { 
                Id: cliente.Id,
                firstName: cliente.firstName,
                lastName: cliente.lastName,
                birthDate: cliente.birthDate,
                genre: cliente.genre,
                phoneNumber: cliente.phoneNumber,
                email: cliente.email,
                active: cliente.active
            }
            
            return response.json(usuario)
        } else {
            return response.status(404).send("E-mail não encontrado.")
        }
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const addCustomer = async (request, response) => {
    try {
        const result = await userData.addCustomer(request.body)
        return response.json(result)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const updateCustomer = async (request, response) => {
    try {
        let name = request.body.name
        request.body.firstName = name.substr(0,name.indexOf(' '));

        if (request.body.firstName == "")
            return response.status(400).send("Informe o nome e sobrenome.")

        request.body.lastName = name.substr(name.indexOf(' ') + 1);

        const result = await userData.updateCustomer(request.params.id, request.body)
        return response.json(result)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

const deleteCustomer = async (request, response) => {
    try {
        const result = await userData.deleteCustomer(request.params.id)
        return response.json(result)
    } catch (error) {
        response.status(400).send(error.message)
        console.log(error.message)
        return
    }
}

module.exports = { getCustomers, getCustomer, CustomerByEmail, addCustomer, updateCustomer, deleteCustomer }