const express = require('express');

const secure = require('../../../api/components/auth/secure')
const response = require('../../../network/responde');
const Controller = require('./index');


const ROUTER = express.Router()

ROUTER.get('/', getAll)
ROUTER.post('/', secure('logged'), add)
ROUTER.put('/:id', secure('logged'), update)
ROUTER.get('/:id', getOne)

function getAll(req, res, next) {
    Controller.list().then((lista) => {
        response.success(req, res, lista, 200)
    }).catch(next);
}


function getOne(req, res, next) {
    console.log(req.params.id, "req.params.id");

    Controller.get(req.params.id).then((post) => {
        response.success(req, res, post, 200)
    }).catch(next);

}


function add(req, res, next) {
    const body = req.body;

    const post = {
        text: body.text,
        user: req.user.id
    }

    Controller.upsert(post).then((user) => {
        response.success(req, res, user, 200)
    }).catch(next);
}

function update(req, res, next) {
    const body = req.body;

    const post = {
        text: body.text,
        id: req.params.id
    }

    Controller.upsert(post, true).then((user) => {
        response.success(req, res, user, 200)
    }).catch(next);
}




module.exports = ROUTER;