import { Menu } from 'antd';

function Nav(props) {
    return (
        <>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="1">Create Application</Menu.Item>
                <Menu.Item key="1">Account</Menu.Item>
            </Menu>
        </>
    );
}

export default Nav;