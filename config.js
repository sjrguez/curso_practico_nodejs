module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: 'mysecret'
    }
}