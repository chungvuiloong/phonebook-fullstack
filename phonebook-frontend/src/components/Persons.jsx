import React from 'react';

const Persons = ({ filteredName, deletePerson }) => {
    return  (
        <>
            {
                filteredName
                    .map((person) => 
                        <div key={person.id}>
                            <span>{person.name} {person.number}</span>
                            <button onClick={()=> deletePerson(person)}>Delete</button>
                        </div>
            )}
        </>
    )
};

export default Persons;