import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dragons = props => {
    const [dragons, setDragons] = useState([]);
    
    const getDragons = async () => {
        axios.get(`${window.$apiUrl}/api/v1/dragon`)
        .then(res => {
            const dragons = res.data;
            dragons.sort((a, b) => a.name.localeCompare(b.name));
            setDragons(dragons);
        });
    };

    useEffect(() => { getDragons() }, [setDragons]);

    return (
        <section id="dragons">
            <h2>Dragons</h2>
            <Link to="/new">Add dragon</Link>
            <ul>
                { dragons.map((value, index) => (
                <li key={index}>
                    <Link to={`/${value.id}`}>{value.name}</Link>
                </li>
                ))}
            </ul>
            <Link to="/login">Logout</Link>
        </section>
    )
}

export default Dragons;