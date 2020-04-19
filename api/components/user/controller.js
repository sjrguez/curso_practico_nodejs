const { nanoid } = require('nanoid')


const TABLA = 'user';
const auth = require('../auth')
module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy')
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }


    async function upsert(data, isUpdate) {

        const user = {
            name: data.name,
            username: data.username
        }

        if (data.id) user.id = data.id;
        if (!data.id) user.id = nanoid();

        if (data.password || data.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: data.password
            }, isUpdate)

        }


        return store.upsert(TABLA, user, isUpdate);
    }


    async function follow(from, to) {
        const data = {
            user_from: from,
            user_to: to
        };

        return store.upsert(`${TABLA}_follow`, data);
    }

    async function following(user) {
        const join = {};
        join[TABLA] = 'user_to';

        const query = { user_from: user };
        return await store.query(TABLA + '_follow', query, join)
    }

    return {
        list,
        get,
        upsert,
        follow,
        following
    }
}