const express = require('express')
const bodyParser = require('body-parser')
const swaggerIU = require('swagger-ui-express')

const errors = require('../network/errors')
const config = require('../config.js')
const user = require('./components/user/network')
const auth = require('./components/auth/network')


const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./swagger.json')

// ROUTER

app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerIU.serve, swaggerIU.setup(swaggerDoc))

app.use(errors)

// Server
app.listen(config.api.port, () => {
    console.log("API escuchando puerto: ", config.api.port);
})