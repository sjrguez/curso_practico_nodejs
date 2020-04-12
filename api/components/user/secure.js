const auth = require('../../../auth')

module.exports = function checkAuth(actiom) {

    function middlewate(req, res, next) {
        switch (actiom) {
            case 'update':
                const owner = req.body.id
                auth.check.own(req, owner)
                next()
                break;

            default:
                next()
        }
    }

    return middlewate
}