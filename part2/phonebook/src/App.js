import { useState, useEffect } from 'react'
import backend from './backendService.js'

const Person = ({name, number, id, deletePerson}) => 
<p>{name} {number} <button onClick = {()=>{deletePerson(id,name)}}>Delete</button></p>

const Filter = ({onChange, value}) => 
<div>filter: <input onChange = {onChange} value = {value}/></div>

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [notifText, setNotifText] = useState('')
  const [showNotif, setShowNotif] = useState(false)

  const refresh = ()=> {
    backend.getPersons().then(response => {
      setPersons(response.data);
    })
    .catch(error => {
        console.log('GET Error', error)
    })
  }

  useEffect(() => {
   
    refresh();

  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if(!persons.map(person=>person.name).includes(newName)){
    const personObject = {
      name: newName,
      number: newNum
    };
    backend.addPerson(personObject)
           .then(response => {
             console.log(response);
           })
           .then(refresh)
           .then(() => {setNotifText(`${newName} has been added`);
                        setShowNotif(true); setTimeout(()=>{setShowNotif(false)}, 2000);
                        setNewName('');setNewNum('')});
  } else {
    if(window.confirm(`Change number for ${newName} ?`)){
      const personOut = persons.filter(person=>person.name==newName)[0];
      const personIn = {...personOut, number: newNum};
      backend.replace(personIn).then(response => {console.log(response)}).then(refresh)
    }
  }
  }
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    console.log(filter)
  }

  const deletePerson = (id,name) => {
    console.log(id);
    if(window.confirm(`Do you wish to remove ${name} ?`)){
    backend.removePerson(id);
    setPersons(persons.filter(person => person.id !== id))};
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notif text= {notifText} show = {showNotif} />
      <Filter onChange = {handleFilterChange} value = {filter} />
      <h3>Add a new contact</h3>
      <Form name = {newName} num = {newNum} nameChange = {handleNameChange}  numChange = {handleNumChange} submit = {onSubmit} />
      <h2>Numbers</h2>
      <People persons = {persons} filter = {filter} deletePerson = {deletePerson}/>
        
    </div>
  )
}

const Notif = ({text, show}) => {
  const style = {
    border: '1px solid green',
    color: 'green',
    background: '#ccc'
  }

  if(show){
  return (
    <div style = {style}>
      {text}
    </div>
  )}

  return <></>
}

const Form = ({name, num, nameChange, numChange, submit}) => 
<form>
<div>
  name: <input onChange = {nameChange} value = {name}/>
</div>
<div>
  number: <input onChange = {numChange} value = {num}/>
</div>
<div>
  <button type="submit" onClick = {submit}>add</button>
</div>
</form>

const People = ({persons, filter, deletePerson}) => {
  return (
    <div>
      {persons.filter(person=>person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person name={person.name} key={person.name} 
        number = {person.number} id = {person.id} deletePerson = {deletePerson}/>)}
    </div>
  )
}

export default App