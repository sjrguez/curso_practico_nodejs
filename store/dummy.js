const db = {
    'user': []
};

async function list(tabla) {
    return db[tabla] || [];
}

async function get(tabla, id) {
    const col = await list(tabla);
    return col.filter(item => item.id === id || null);
}

async function upsert(tabla, data) {
    if (!db[tabla]) db[tabla] = [];

    db[tabla].push(data)
    return data
}

async function query(tabla, query) {
    const col = await list(tabla);
    const keys = Object.keys(query);
    const key = keys[0];
    const info = col.filter(item => item[key] === query[key] || null);

    return info ? info[0] : info

}

async function remove(tabla, id) {
    return true
}


module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}