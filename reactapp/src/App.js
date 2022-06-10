import { Layout } from 'antd';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Nav from './components/Nav';
import Home from './components/Home';
import Account from './components/Account';
import Application from './components/Application';
import Register from './components/Register';
import Login from './components/Login';
import CreateApplication from './components/CreateApplication';
import UserContext from './contexts/user';
import React from 'react';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {loggedIn: false}
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log("User is now being set on the context");
    user.loggedIn = true;
    this.setState({user: user});
  }

  logout() {
    console.log("Removing user from the app context");
    this.setState({user: {loggedIn: false}});
  }

  

  render() {

    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };

    if (!this.state.user.loggedIn) {
      return (
        <Layout className="layout">
          <UserContext.Provider value={context}>
            <Router>
              <Header>
                <Nav />
              </Header>
  
              <Content>
                <Switch>
                  <Route path='/register' children={<Register />} />
                  <Route path='/login' children={<Login></Login>}  />
                  <Route path='/' children={<Home />} />
                </Switch>
              </Content>
  
              <Footer style={{ textAlign: 'center' }}>Created for QHO541</Footer>
  
            </Router>
          </UserContext.Provider>
        </Layout>
      )
    }
    
    return (
      <>
        <Layout className="layout">
          <UserContext.Provider value={context}>
            <Router>
              <Header>
                <Nav />
              </Header>

              <Content>
                <Switch>
                  <Route path='/account' children={<Account />} />
                  <Route path='/application/:id' children={<Application />} />
                  <Route path='/register' children={<Register />} />
                  <Route path='/login' children={<Login></Login>} />
                  <Route path='/create' children={<CreateApplication />} />
                  <Route path='/' children={<Home />} />
                </Switch>
              </Content>

              <Footer style={{ textAlign: 'center' }}>Created for QHO541</Footer>
            </Router>
          </UserContext.Provider>
        </Layout>
      </>
    );
  }
  
}

export default App;