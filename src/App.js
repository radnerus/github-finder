import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios';
import Search from './components/users/Search';
import { Alert } from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

  searchUsers = async userString => {
    this.setState({
      loading: true
    });
    const userResponse = await axios.get(`https://api.github.com/search/users?q=${userString}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      loading: false,
      users: userResponse.data.items
    });
  }

  getUser = async userName => {
    this.setState({
      loading: true
    });
    const userResponse = await axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      loading: false,
      user: userResponse.data
    });
  }

  getRepos = async userName => {
    this.setState({
      loading: true
    });
    const reposResponse = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({
      loading: false,
      repos: reposResponse.data
    });
  }

  clearUsers = () => this.setState({ loading: false, users: [] });

  setAlert = (message, severity) => {
    this.setState({
      alert: {
        message, severity
      }
    });

    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 3000);
  }

  render() {
    return (
      <Router>
        <div className="App" >
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" render={props => (
                <Fragment>
                  <Alert alert={this.state.alert} />
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={!!this.state.users.length} setAlert={this.setAlert} />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={
                props => (
                  <User {...props} getUser={this.getUser} getRepos={this.getRepos} user={this.state.user} loading={this.state.loading} repos={this.state.repos} />
                )
              } />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
