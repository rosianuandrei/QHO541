import { Menu } from 'antd';
import { useContext } from 'react';
import UserContext from '../contexts/user';

function Nav(props) {
    const context = useContext(UserContext);

    if (context.user.loggedIn) {
        return (
            <>
                <UserContext.Provider value={context}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/create'>Create Application</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/account'>Account</Link></Menu.Item>
                    <Menu.Item key='4' onClick={context.logout}><Link to='/login'>Logout</Link></Menu.Item>
                </Menu>
                </UserContext.Provider>
            </>
        );
    } else {
        return (
            <>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key='1'><Link to='/register'>Register</Link></Menu.Item>
                    <Menu.Item key='2'><Link to='/login'>Login</Link></Menu.Item>
                </Menu>
            </>
        );
    }
}

export default Nav;