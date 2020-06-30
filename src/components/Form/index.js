import React from 'react';
import axios from 'axios';
import moment from 'moment';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.dragon.id || '',
            name: props.dragon.name || '', 
            type: props.dragon.type || '',
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

        if(this.state.id) {
            const body = {
                name: this.state.name,
                type: this.state.type
            };
            
            axios.put(`${window.$apiUrl}/api/v1/dragon/${this.state.id}`, body)
            .then(() => {
                this.setState({
                    msg: 'The data has been updated successfully!'
                });
            });
        } else {
            const body = {
                name: this.state.name,
                type: this.state.type,
                createdAt: moment().format()
            };

            axios.post(`${window.$apiUrl}/api/v1/dragon`, body)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    msg: 'The dragon was successfully added!'
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
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Formulário</legend>
                    <input type="hidden" name="id" value={this.state.id} />
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <label htmlFor="type">Type:</label>
                    <input type="text" id="type" name="type" value={this.state.type} onChange={this.handleChange} />
                    <button type="submit">Save</button>
                    {this.state.msg && 
                        <p>{this.state.msg}</p>
                    }
                    {this.state.id && 
                        <button type="button" onClick={() => this.deleteDragon()}>Delete</button>
                    }
                </fieldset>
            </form>
        )
    }
}

export default Form;