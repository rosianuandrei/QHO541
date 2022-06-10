import { Menu } from 'antd';
import { useContext } from 'react';
import UserContext from '../contexts/user';

function Nav(props) {
    const logout = useContext(UserContext);
    return (
        <>
        <UserContext.Provider value={logout}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/create'>Create Application</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/account'>Account</Link></Menu.Item>
                <Menu.Item key='4'><Link to='/register'>Register</Link></Menu.Item>
                <Menu.Item key='5'><Link to='/login'>Login</Link></Menu.Item>
                <Menu.Item key='6' onClick={logout.logout}><Link to='/'>Logout</Link></Menu.Item>
            </Menu>
        </UserContext.Provider>
        </>
    );
}

export default Nav;