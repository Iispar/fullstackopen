import axios from 'axios'

const url = '/api/persons'

const getAll = () => {
    return axios.get(url)
}

const create = (person) => {
    return axios
    .post(url, person)
    .then(response => response.data)
}

const update = (id, newObject) => {
    return axios.post(`${url}/${id}`, newObject)
}

const deleteName = (id) => {
    return axios.delete(`${url}/${id}`)
}

const newNro = (id, newNro, newName) => {
    return axios.put(`${url}/${id}`, {name: newName, nro: newNro})
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll, 
    create,
    update,
    deleteName,
    newNro
}