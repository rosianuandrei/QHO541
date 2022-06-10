import { PageHeader, Input, Button, Typography } from "antd";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../contexts/user';
import ApplicationGrid from './Applicationgrid';

const { Title } = Typography;
const { Search } = Input;

function Home(props) {

    const context = useContext(UserContext);

    if (context.user.loggedIn) {
        return (
            <>
                <div className="site-layout-content">
                    <div style={{ padding: '2% 20%' }}>
                        <Search 
                            placeholder="input search text"
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={null} />
                        <PageHeader
                            className="site-page-header"
                            title="The Trading License Department"
                            subTitle="Welcome to the TLD." />
                    </div>
                    <ApplicationGrid />
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="site-layout-content" style={{height: '85vh'}}>
                    <Title style={{textAlign: 'center', paddingTop: "5rem", paddingBottom: "5rem"}}>Trading License Department</Title>
                    <Title level={5} style={{textAlign: 'center', paddingBottom: "3rem"}}>To submit applications or to see the status of a submitted application, please login first.</Title>

                    <div style={{display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                        <Button type="primary" style={{width: '8rem', marginBottom: "1rem"}}><Link to='/login'>Login</Link></Button>
                        <Button type="link"><Link to ='/register'>I don't have an account. Register</Link></Button>
                    </div>
                </div>
                
            </>
        )
    }
    
}

export default Home;