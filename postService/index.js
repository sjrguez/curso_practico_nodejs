const express = require('express')
const bodyParser = require('body-parser')

const errors = require('../network/errors')
const config = require('../config.js')
const post = require('./components/post/network');


const app = express();

app.use(bodyParser.json());

// ROUTER


app.use('/api/post', post)

app.use(errors)

// Server
app.listen(config.postService.port, () => {
    console.log("API para los post escuchando puerto: ", config.postService.port);
})