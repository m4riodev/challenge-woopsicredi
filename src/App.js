import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Header from './components/Header';
import Login from './components/Login';
import Dragons from './components/Dragons';
import Dragon from './components/Dragon';
import './style.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/new" component={Dragon} />
          <PrivateRoute path="/:id" component={Dragon} />
          <PrivateRoute path="/" component={Dragons} />
        </Switch>
      </Router>
    );
  }
}

export default App;