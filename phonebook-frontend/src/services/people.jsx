import axios from 'axios'
const baseUrl = '/api/persons'

async function getAll () {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

async function createNewPerson (newPerson) {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

async function updatePerson (currentPersonId, updatedNumber) {
    const request = axios.put(`${baseUrl}/${currentPersonId}`, updatedNumber)
    return request.then(response => response.data)
}

async function deletePersonId (personId) {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

export { getAll, createNewPerson, updatePerson, deletePersonId }