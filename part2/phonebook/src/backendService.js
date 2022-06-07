import axios from 'axios'


const getPersons = () => {
    return axios.get('http://localhost:3001/persons')
}

const addPerson = (personObject) => {
    return axios.post('http://localhost:3001/persons',personObject)
}

const removePerson = (id) => {
    return axios.delete('http://localhost:3001/persons/'+id);
}

const replace = (person) => {
    return axios.put('http://localhost:3001/persons/'+person.id, person);
}

export default {getPersons, addPerson, removePerson, replace}