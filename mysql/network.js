const express = require('express');

const response = require('../network/responde');
const Store = require('../store/mysql')

const ROUTER = express.Router()

ROUTER.get('/:tabla', list)
ROUTER.get('/:tabla/:id', get)
ROUTER.post('/:tabla', insert)
ROUTER.put('/:tabla', upsert)

async function list(req, res, next) {
    const table = req.params.tabla;

    try {
        const data = await Store.list(table);
        response.success(req, res, data, 200)
    } catch (error) {
        next
    }
}

async function get(req, res, next) {
    const table = req.params.tabla;
    const id = req.params.id

    try {
        const data = await Store.get(table, id);
        response.success(req, res, data, 200)
    } catch (error) {
        next
    }
}

async function insert(req, res, next) {
    const table = req.params.tabla;
    const body = req.body;
    console.log(body, "body");

    try {
        const data = await Store.upsert(table, body);
        response.success(req, res, data, 200)
    } catch (error) {
        next
    }
}


async function upsert(req, res, next) {
    const table = req.params.tabla;
    const body = req.body;
    console.log(body, "body2");

    try {
        const data = await Store.upsert(table, body, true);
        response.success(req, res, data, 200)
    } catch (error) {
        next
    }
}



module.exports = ROUTER;