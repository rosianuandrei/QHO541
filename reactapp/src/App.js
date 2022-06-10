import { Layout } from 'antd';
import './App.css';

import Nav from './components/Nav';
import Home from './components/Home';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout className="layout">

        <Header>
          <Nav />
        </Header>

        <Content>
          <Home />
        </Content>

        <Footer style={{ textAlign: 'center' }}>Created for QHO541</Footer>
      </Layout>
    </>
  );
}

export default App;
