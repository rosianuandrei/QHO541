import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { Redirect } from 'react-router-dom';

const formItemLayout = {
    labelCol: { xs: {span : 24}, sm: { span: 6 }},
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 }}
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 }}
};

const companyNameRules = [
    { required: true, message: "Please input the name of the company"}
];

const addressRules = [
    {required: true, message: "Please input the address of the company"}
]

const companyNumberRules = [
    {required: true, message: "Please input the unique number of the company"}
]

const sicRules = [
    {required: true, message: "Please input the SIC of the company"}
]

/**
 * Create Application form component to create an application in the app
 */
class createApplication extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    state = {redirect: null}

    onFinish(values) {
        values.userid = this.context.user.id;
        values.companynumber = parseInt(values.companynumber);
        values.sic = parseInt(values.sic);
        fetch('https://localhost:3000/api/applications', {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password),
                "Content-Type": "application/json"
            }
        })
        .then(status)
        .then(json)
        .then(application => {
            alert('Application was added. You will be redirected to homepage')
            this.setState({redirect: '/'});
        })
        .catch(error => {
            alert('Username/Password incorrect')
            console.log(error);
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Form style={{paddingTop: '2rem', height: '85vh'}} {...formItemLayout} name="createApplication" onFinish={this.onFinish} scrollToFirstError>
                <Form.Item name="companyname" label="Company Name" rules={companyNameRules}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={addressRules}>
                    <Input />
                </Form.Item>
                <Form.Item name="companynumber" label="Company Number" rules={companyNumberRules}>
                    <Input />
                </Form.Item>
                <Form.Item name="sic" label="SIC" rules={sicRules}>
                    <Input />
                </Form.Item>
                <Form.Item {...tailFormItemLayout} >
                    <Button  type="primary" htmlType="submit" >Create</Button>
                </Form.Item>
            </Form>
        );
    };
};

export default createApplication;