import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Form from '../Form';

const Dragon = props => {
    const { id } = useParams();
    const history = useHistory();
    const [dragon, setDragon] = useState({});
    
    const getDragon = () => {
        if(id) {
            axios.get(`${window.$apiUrl}/api/v1/dragon/${id}`)
            .then(res => setDragon(res.data));
        }
    };

    useEffect(() => { getDragon() }, []);
    
    return (
        <section id="dragon">
            <h2>Dragon</h2>
            {(dragon.name || !id) && 
                <Form dragon={dragon} apiUrl={props.apiUrl} history={history} />
            }
            <button type="button" onClick={() => history.push('/')}>Back</button>
        </section>
    )
}

export default Dragon;