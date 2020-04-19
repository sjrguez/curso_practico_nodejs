module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'mysecret'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'G9nmHvbJZU',
        password: process.env.MYSQL_PASS || 'k010flVpf7',
        database: process.env.MYSQL_DB || 'G9nmHvbJZU'
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'http://localhost',
        port: process.env.MYSQL_SRV_PORT || 3001
    },
    postService: {
        port: process.env.POST_SRV_PORT || 3002
    }
}