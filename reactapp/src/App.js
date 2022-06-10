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

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout className="layout">
        <Router>
          <Header>
            <Nav />
          </Header>

          <Content>
            <Switch>
              <Route path='/account' children={<Account />} />
              <Route path='/application/:id' children={<Application />} />
              <Route path='/register' children={<Register />} />
              <Route path='/login' children={<Login />} />
              <Route path='/create' children={<CreateApplication />} />
              <Route path='/' children={<Home />} />
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Created for QHO541</Footer>
        </Router>
      </Layout>
    </>
  );
}

export default App;
