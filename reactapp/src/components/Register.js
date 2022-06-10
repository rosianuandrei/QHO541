import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';

const formItemLayout = {
    labelCol: { xs: { span: 24}, sm: { span: 6}},
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 }}
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6}}
};

const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!'}
];

const passwordRules = [
    {required: true, message: 'Please input your password!'},
    {min: 9, message: 'The password should have at least 9 characters'}
];

const confirmRules = [
    {required: true, message: 'Please confirm your password'},
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if(!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The password that you entered do not match');
        }
    })
];

const usernameRules = [
    {required: true, message: 'Please input your username!', whitespace: true}
]

const firstnameRules = [
    {required: true, message: 'Please input your First Name'}
];

const lastnameRules = [
    {required: true, message: 'Please input your First Name'}
]

/**
 * Registration form component to signup
 */

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish = (values) => {
        console.log('Received values form: ', values);
        const { confirm, ...data } = values; // ignore the 'confirm' value
        fetch('https://localhost:3000/api/users', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            console.log(data);
            alert("User added")
        })
        .catch(errorResponse => {
            console.error(errorResponse);
            alert(`Error: ${errorResponse}`);
        });
    };

    render() {
        return (
            <Form style={{paddingTop: '2rem', height: '85vh'}} {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
                <Form.Item name="firstname" label="First Name" rules={firstnameRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="lastname" label="Last Name" rules={lastnameRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="E-mail" rules={emailRules}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
                    <Input.Password />
                </Form.Item>

                <Form.Item name="confirm" label="Confirm Password" rules={confirmRules} hasFeedback>
                    <Input.Password />
                </Form.Item>

                <Form.Item name="username" label="Username" rules={usernameRules}>
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Register;