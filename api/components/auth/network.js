const express = require('express');

const response = require('../../../network/responde');
const Controller = require('./index');

const ROUTER = express.Router()

ROUTER.post('/login', loguear)


function loguear(req, res) {
    const body = req.body;


    Controller.login(body.username, body.password)
        .then((token) => {
            console.log(token, "token");
            response.success(req, res, token, 200)

        })
        .catch(error => response.error(req, res, error, 400))
}




module.exports = ROUTER;