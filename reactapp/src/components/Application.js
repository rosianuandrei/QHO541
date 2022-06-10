import React from 'react';
import { useParams } from 'react-router-dom';

function Application(props) {
    let { id } = useParams();
    return (
        <>
            <h1>Application ID: {id}</h1>
            <p>This is where individual applications can be displayed</p>
        </>
    );
}

export default Application;