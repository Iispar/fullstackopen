import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blogToUpdate => {
  const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config)
  return response.data
}

const deleteBlog = async id => {
  var config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog }