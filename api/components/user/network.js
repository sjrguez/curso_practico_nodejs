const express = require('express');

const secure = require('./secure')
const response = require('../../../network/responde');
const Controller = require('./index');


const ROUTER = express.Router()

ROUTER.get('/', getAll)

ROUTER.get('/:id', getOne)

ROUTER.post('/', upsert)


ROUTER.put('/', secure('update'), upsert)



function getAll(req, res, next) {
    Controller.list().then((lista) => {
        response.success(req, res, lista, 200)
    }).catch(next);
}

function getOne(req, res, next) {
    Controller.get(req.params.id).then((user) => {
        response.success(req, res, user, 200)
    }).catch(next);

}


function upsert(req, res, next) {
    const body = req.body;
    Controller.upsert(body).then((user) => {
        response.success(req, res, user, 200)
    }).catch(next);

}

function remove(req, res, next) {
    Controller.remove(req.params.id).then((user) => {
        response.success(req, res, user, 200)
    }).catch((error) => {
        response.error(req, res, error.message, 500)
    });
}

module.exports = ROUTER;