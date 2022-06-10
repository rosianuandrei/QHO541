import { Menu } from 'antd';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';

function Nav(props) {
    const context = useContext(UserContext);
    const [current, setCurrent] = useState('1');
    const handleClick = e => {
        // console.log('click ', e);
        setCurrent(e.key);
    };

    if (context.user.loggedIn) {
        return (
            <>
                <UserContext.Provider value={context}>
                <div className="logo" />
                <Menu onClick={handleClick} selectedKeys={[current]} defaultSelectedKeys='1' theme="dark" mode="horizontal" >
                    <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/create'>Create Application</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/account'>Account</Link></Menu.Item>
                    <Menu.Item key='4' onClick={context.logout}><Link to='/'>Logout</Link></Menu.Item>
                </Menu>
                </UserContext.Provider>
            </>
        );
    } else {
        return (
            <>
                <div className="logo" />
                <Menu onClick={handleClick} defaultSelectedKeys='1' theme="dark" mode="horizontal" >
                    <Menu.Item key="5"><Link to='/'>Home</Link></Menu.Item>
                    <Menu.Item key='6'><Link to='/register'>Register</Link></Menu.Item>
                    <Menu.Item key='7'><Link to='/login'>Login</Link></Menu.Item>
                </Menu>
            </>
        );
    }
}

export default Nav;