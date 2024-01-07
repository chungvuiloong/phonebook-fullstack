import React from 'react';

const Notification = ({ message, notificationType }) => {

    const successful = {         
        fontSize: '25px', 
        position: 'absolute', 
        top: 0, 
        right: 0, 
        border: '2px solid green', 
        backgroundColor: 'lightgreen'  
    }

    const error = {         
        fontSize: '25px', 
        position: 'absolute', 
        top: 0, 
        right: 0, 
        border: '2px solid red', 
        backgroundColor: 'pink'  
    }

    const notificationStyle = notificationType === 'successful' ? successful : error
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;