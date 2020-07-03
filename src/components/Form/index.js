import React from 'react';
import axios from 'axios';
import moment from 'moment';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.dragon.id || '',
            createdAt: props.dragon.createdAt || '',
            name: props.dragon.name || '', 
            type: props.dragon.type || '',
            submitted: false,
            loading: false,
            msg: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { id, name, type } = this.state;

        if(!(name && type)) return;

        if(id) {
            const body = {
                name: name,
                type: type
            };
            
            axios.put(`${window.$apiUrl}/api/v1/dragon/${id}`, body)
            .then(() => {
                this.setState({
                    msg: 'The data has been updated successfully!',
                    loading: false
                });
            });
        } else {
            const body = {
                name: name,
                type: type,
                createdAt: moment().format()
            };

            axios.post(`${window.$apiUrl}/api/v1/dragon`, body)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    createdAt: res.data.createdAt,
                    msg: 'The dragon was successfully added!',
                    loading: false
                });
            });
        }
    }

    deleteDragon() {
        if(window.confirm('Are you sure you want to delete this dragon?')) {
            axios.delete(`${window.$apiUrl}/api/v1/dragon/${this.state.id}`)
            .then(() => {
                this.props.history.goBack();
            });
        }
    }

    render() {
        const { id, createdAt, name, type, msg, submitted, loading } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Formulário</legend>
                    {createdAt && 
                        <em>Created At: {createdAt}</em>
                    }
                    <input type="hidden" name="id" value={id} />
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={this.handleChange} />
                    {submitted && !name &&
                        <small>Name is required</small>
                    }
                    <label htmlFor="type">Type:</label>
                    <input type="text" id="type" name="type" value={type} onChange={this.handleChange} />
                    {submitted && !type &&
                        <small>Type is required</small>
                    }
                    <button type="submit" disabled={loading}>Save</button>
                    {id && 
                        <button type="button" onClick={() => this.deleteDragon()}>Delete</button>
                    }
                    {msg && 
                        <p className="success">{msg}</p>
                    }
                </fieldset>
            </form>
        )
    }
}

export default Form;