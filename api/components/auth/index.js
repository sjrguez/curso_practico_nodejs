const store = require('../../../store/mysql');
const controller = require('./controller.js');


module.exports = controller(store);