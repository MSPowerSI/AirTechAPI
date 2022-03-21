const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use('/', routes.routes)

app.listen(8080,'0.0.0.0', () => {
    console.log('Starded at http://localhost:8080')
})