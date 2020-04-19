const bscrypt = require('bcrypt');
const auth = require('../../../auth')
const error = require('../../../utils/error')


const TABLA = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy')
    }
    async function login(username, password) {
        const data = await store.query(TABLA, { username });
        console.log(data, "dd");

        return bscrypt.compare(password, data.password)
            .then(async(valida) => {
                console.log(valida, "valida");

                if (valida) {

                    const token = await auth.sign(data);
                    return token

                } else {
                    throw error("Informacion invalida", 400)
                }
            }).catch(error => {
                console.log(error, "err");

                throw error
            })

    }

    async function upsert(data, isUpdate) {
        const authData = {
            id: data.id
        }

        if (data.username) authData.username = data.username
        if (data.password) authData.password = bscrypt.hashSync(data.password, 11);

        return store.upsert(TABLA, authData, isUpdate)
    }



    return {
        upsert,
        login
    }
}