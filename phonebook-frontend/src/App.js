import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import { getAll, updatePerson, createNewPerson, deletePersonId } from './services/people'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [searchName, setSearchName] = useState("")
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState(null)
    const filteredName = persons?.filter(person => person?.name?.toLocaleLowerCase().includes(searchName?.toLocaleLowerCase()))
    useEffect(() => {
        getAll()
        .then(person => {
            setPersons(person)
        })
    }, [persons, setPersons])

    const nameChangeHandler = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setNewName(value)
    }

    const numberChangeHandler = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setNewNumber(value)
    }

    const searchNameHandler = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearchName(value)
    }

    const resetNameNumberInput = () => {
        setNewName("")
        setNewNumber("")
    }

    const resetSearchInput = () => {
        setSearchName("")
    }

    function notificationHandler(message, time, type) {
        setNotificationType(type);
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
            setNotificationType(null);
        }, `${time}000`);
        resetNameNumberInput();
    }

    const addPerson = (e) => {
        e.preventDefault()
        const newPersonData = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
        };

        const removeSpaces = newName.replace(/\s/g, '');
        if (!removeSpaces) {
            return notificationHandler(`Add a name to continue`, 5, 'error')
        }

        if (checkForSamePerson()) {
            if ( window.confirm(`${newName} is already in the phonebook. Updated the existing phone number?`) === true) {
                const findPersonId = (persons.find(p => p.name === newPersonData?.name) || {}).id;
                updatePerson(findPersonId, {name: newName, number: newNumber})
                    .then(updatedPerson => {
                            const updatedPersons = persons.map(person =>
                                person.id === updatedPerson.id ? updatedPerson : person
                            );
                        notificationHandler(`Updated ${newName} number to ${newNumber}`, 5, 'successful')
                        setPersons(updatedPersons);
                        resetNameNumberInput()
                        }
                    )
                    .catch(_=> {
                        notificationHandler(`The new number wasn't updated`, 5, 'error')
                    })
            }
        } else {    
                createNewPerson(newPersonData)
                    .then(p => {
                        notificationHandler(`Added ${newPersonData.name}`, 5, 'successful')
                        setPersons(persons.concat(p))
                        resetNameNumberInput()
                        })                
                    .catch(_=> {
                        notificationHandler(`New person wasn't created`, 5, 'error')
                    })
            }
    }

    const checkForSamePerson = (name = newName) => {
        const check = persons.filter(p => (p.name.toLocaleLowerCase() === name.toLocaleLowerCase()))
        if (check.length === 1) {
            return true
        } 
    }

    const deletePerson = (person) => {
        const personIdtoRemove = persons.filter((p)=> p.id !== person?.id)
        const text = `Do you want to delete ${person.name}`
       if (window.confirm(text) === true) {
            deletePersonId(person?.id)
                .then(_=> {
                    setPersons(personIdtoRemove)
                    notificationHandler(`Deleted ${person.name}`, 5, 'successful')
                })
                .catch(_=> {
                    notificationHandler(`Note: ${person.name} has already been removed`, 5, 'error')
                })
       }
    }

    return (
        <div style={{ position: 'relative'}}>
            <h2 >Phonebook</h2>
            <Filter searchName={searchName} searchNameHandler={searchNameHandler} resetSearchInput={resetSearchInput} />
            
            <h2>Add a new person & number</h2>
            {
                notification ? 
                    <Notification message={notification} notificationType={notificationType}/> 
                : 
                    ""
            }
            <Form addPerson={addPerson} newName={newName} nameChangeHandler={nameChangeHandler} newNumber={newNumber} numberChangeHandler={numberChangeHandler} />

            <h2>Contacts</h2>
            <Persons 
                    filteredName={filteredName} 
                    deletePerson={deletePerson}
                />
        </div>
    )
}

export default App