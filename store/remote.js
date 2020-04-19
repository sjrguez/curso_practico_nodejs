const request = require('request');

function createRemoteDB(host, port) {
    const URL = `${host}:${port}/tabla`;

    function list(table) {
        return req('GET', table)
    }

    function get(tabla, id) {
        return req('GET', `${tabla}/${id}`)
    }

    function upsert(tabla, data, isUpdate) {
        if (isUpdate) {
            return req('PUT', tabla, data)
        } else {
            return req('POST', tabla, data)
        }
    }



    function req(method, table, data) {
        let url = `${URL}/${table}`;
        let body = '';
        if (data) body = JSON.stringify(data)

        return new Promise((resolve, reject) => {
            const options = {
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }

            request(options, (error, req, body) => {
                if (error) {
                    console.error('[base de datos remota]', error);
                    return reject(error.messaage);
                }
                const resp = JSON.parse(body);
                return resolve(resp.body)
            })
        })
    }


    return {
        list,
        get,
        upsert
    }

}


module.exports = createRemoteDB