const userData = require('../data/userData')

const loginCustomer = async (request, response) => {
    try {
        const user = await userData.getCustomerByEmail(request.body.credentials.username, false)

        if (!user) {
            return response.status(404).send('Usuário não cadastrado.')
        }

        if (user.password === request.body.credentials.password) {
            if (!user.active) {
                return response.status(400).send('O usuário está inativo.')
            }
        } else {
            return response.status(404).send('O usuário e a senha fornecidos estão incorretos.')
        }
        return response.json({
            Id: user.Id,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            genre: user.genre,
            phoneNumber: user.phoneNumber,
            email: user.email,
            active: user.active
        })
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

const registerCustomer = async (request, response) => {
    try {
        const user = await userData.getCustomerByEmail(request.body.dados.email, false)

        if (user) {
            return response.status(400).send('Usuário já cadastrado.')
        }

        let name = request.body.dados.name

        request.body.dados.firstName = name.substr(0, name.indexOf(' '));

        if (request.body.dados.firstName == "")
            return response.status(400).send("Informe o nome e sobrenome.")

        request.body.dados.lastName = name.substr(name.indexOf(' ') + 1);

        let create = await userData.addCustomer(request.body.dados)

        let UserCadastrado = await userData.getCustomer(create.insertId)

        return response.json({
            Id: UserCadastrado[0].Id,
            firstName: UserCadastrado[0].firstName,
            lastName: UserCadastrado[0].lastName,
            birthDate: UserCadastrado[0].birthDate,
            genre: UserCadastrado[0].genre,
            phoneNumber: UserCadastrado[0].phoneNumber,
            email: UserCadastrado[0].email,
            active: UserCadastrado[0].active
        })
    } catch (error) {
        return response.status(400).send(error.message)
    }
}

module.exports = {
    loginCustomer,
    registerCustomer
}