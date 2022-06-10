import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, PageHeader, Descriptions, Tabs } from 'antd';
import UserContext from '../contexts/user';
import { status, json } from '../utilities/requestHandlers';

const formItemLayout = {
    labelCol: { xs: {span : 24}, sm: { span: 6 }},
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 }}
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 }}
};

const { TabPane } = Tabs;


class Account extends React.Component {
    static contextType = UserContext;

    onFinish = (value) => {
        fetch(this.context.user.links.self, {
            method: "PUT",
            body: JSON.stringify(value),
            headers: {
                "Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password),
                "Content-Type": "application/json"
            }
        })
        .then(status)
        .then(json)
        .then(data => {
            alert("Account Edited")
            this.context.logout();
        })
        .catch(errorResponse => {
            console.error(errorResponse);
            alert(`Error: ${errorResponse}`);
        });
    }

    render() {
        return (
            <>
                <PageHeader
                    onBack={() => window.history.back()}
                    className="site-page-header-ghost-wrapper"
                    title={`Account details page of: ${this.context.user.username}`}
                />
                 <Tabs defaultActiveKey='1' onChange={this.callback} style={{height: '78vh'}}>
                        <TabPane tab="Account Details" key="1">
                            <div>
                                <Descriptions
                                    bordered
                                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                >
                                    <Descriptions.Item label="First Name">{this.context.user.firstname}</Descriptions.Item>
                                    <Descriptions.Item label="Last Name">{this.context.user.lastname}</Descriptions.Item>
                                    <Descriptions.Item label="Username">{this.context.user.username}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{this.context.user.email}</Descriptions.Item>
                                    <Descriptions.Item label="Registered on">{this.context.user.dateregistered}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        </TabPane>
                        <TabPane tab="Edit Account" key="2">
                            <div>
                                <Form {...formItemLayout} name="editAccount" onFinish={this.onFinish} scrollToFirstError>
                                    <Form.Item name="firstname" label="First Name" >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="lastname" label="Last Name">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="email" label="E-mail">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="password" label="Password">
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item {...tailFormItemLayout} >
                                        <Button  type="primary" htmlType="submit">Edit</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </TabPane>
                    </Tabs>
            </>
        );
    }

}

export default withRouter(Account);