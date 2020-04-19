const express = require('express');

const secure = require('../auth/secure')
const response = require('../../../network/responde');
const Controller = require('./index');


const ROUTER = express.Router()

ROUTER.get('/', getAll)

ROUTER.get('/:id', getOne)

ROUTER.post('/', add)
ROUTER.put('/', secure('update'), update)

ROUTER.post('/follow/:id', secure('logged'), follow)
ROUTER.get('/following/:id', following)




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


function add(req, res, next) {
    const body = req.body;
    Controller.upsert(body).then((user) => {
        response.success(req, res, user, 200)
    }).catch(next);

}

function update(req, res, next) {
    const body = req.body;
    Controller.upsert(body, true).then((user) => {
        response.success(req, res, user, 200)
    }).catch(next);

}

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id).then((data) => {
        response.success(req, res, data, 200)
    }).catch(next);
}

function following(req, res, next) {
    Controller.following(req.params.id).then((data) => {
        response.success(req, res, data, 200)
    }).c
}
module.exports = ROUTER;