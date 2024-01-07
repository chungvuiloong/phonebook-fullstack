import React from 'react';

const Form = ({ addPerson, newName, nameChangeHandler, newNumber, numberChangeHandler}) => {
    return (
        <form onSubmit={addPerson}>
            <div>name:    
            <input type="text" 
                name="name"
                value={newName}
                onChange={nameChangeHandler} />
            </div>

            <div>number:  
            <input type="text" 
                name="number"
                value={newNumber}
                onChange={numberChangeHandler} />
            </div>

            <div><button type="submit" >add</button></div>
        </form>
    );
};

export default Form;