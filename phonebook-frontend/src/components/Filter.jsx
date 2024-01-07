import React from 'react';

const Filter = ({ searchName, searchNameHandler, resetSearchInput}) => {
    return (
        <>
            <div>Filter list with the name: 
                <input value={searchName} onChange={searchNameHandler} />
                <button onClick={resetSearchInput}>Clear</button>
            </div>
        </>
        )
};

export default Filter;