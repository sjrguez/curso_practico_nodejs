const { nanoid } = require('nanoid')


const TABLA = 'post';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy')
    }

    function list() {
        return store.list(TABLA);
    }

    async function upsert(data, isUpdate) {

        let post = data
        if (!isUpdate) {
            post = {
                text: data.text,
                id: nanoid(),
                user: data.user
            }
        }

        return store.upsert(TABLA, post, isUpdate);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    return {
        list,
        upsert,
        get
    }
}