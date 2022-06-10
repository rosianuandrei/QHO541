import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';

const formItemLayout = {
    labelCol: { xs: {span : 24}, sm: { span: 6 }},
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 }}
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 }}
};

const passwordRules = [
    { required: true, message: "Please input password!"}
];

const usernameRules = [
    {required: true, message: "Please input your username!", whitespace: true}
]

/**
 * Login form component to login in the app
 */
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(values) {
        const {username, password} = values;
        console.log(`logging in user: ${username}`)
        fetch('https://localhost:3000/api/users/login', {
            method: "POST",
            headers: {
                "Authorization": "Basic " + window.btoa(username + ":" + password)
            }
        })
        .then(status)
        .then(json)
        .then(user => {
            console.log('Logged in succesfully');
            console.log(user);
        })
        .catch(error => {
            console.log('Login failed');
        });
    }

    render() {
        return (
            <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError>
                <Form.Item name="username" label="Username" rules={usernameRules}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        );
    };
};

export default Login;