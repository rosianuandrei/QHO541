import { Menu } from 'antd';

function Nav(props) {
    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/create'>Create Application</Link></Menu.Item>
                <Menu.Item key="3"><Link to='/account'>Account</Link></Menu.Item>
                <Menu.Item key='4'><Link to='/register'>Register</Link></Menu.Item>
                <Menu.Item key='5'><Link to='/login'>Login</Link></Menu.Item>
            </Menu>
        </>
    );
}

export default Nav;