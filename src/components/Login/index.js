import React from 'react';

import { userService } from '../../services';

class Login extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
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
        const { username, password } = this.state;

        if(!(username && password)) return;

        this.setState({ loading: true });
        userService.login(username, password)
        .then(
            user => {
                const { from } = this.props.location.state || { from: { pathname: "/" } };
                this.props.history.push(from);
            },
            error => this.setState({ error, loading: false })
        );
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <section>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Access form</legend>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <small>Username is required</small>
                        }
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <small>Password is required</small>
                        }
                        <button type="submit" disabled={loading}>Login</button>
                        {error &&
                            <p>{error}</p>
                        }
                    </fieldset>
                </form>
            </section>
        );
    }
}

export default Login;