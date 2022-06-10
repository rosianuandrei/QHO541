import React from 'react';
import { withRouter } from 'react-router';
import { Steps, PageHeader, Descriptions } from 'antd';
import { Form, Input, Button, Steps, Select, PageHeader, Descriptions, Tabs } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { Redirect } from 'react-router-dom';

const { Option } = Select;

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } }
};

const { Step } = Steps;
const { TabPane } = Tabs;

class Application extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            application: undefined,
            key: '1',
            state: null,
            progress: 0,
            statusApp: 'finish'
        }
        this.onFinish = this.onFinish.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://localhost:3000/api/applications/${id}`, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password)
            }
        })
            .then(status)
            .then(json)
            .then(data => {
                this.setState({ application: data })
                if (this.state.application[0].status === 'pending') {
                    this.setState({ progress: 1 })
                } else if (this.state.application[0].status === 'accepted') {
                    this.setState({ progress: 2 })
                } else if (this.state.application[0].status === 'rejected') {
                    this.setState({ progress: 3 })
                    this.setState({ statusApp: 'error' })
                }
            })
            .catch(err => console.log("error fetching articles", err));
    }

    callback = (key) => {
        this.setState({ key })
    }

    onFinish = (value) => {
        fetch(`https://localhost:3000/api/applications/${this.props.match.params.id}`, {
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
                alert("Application Edited")
                this.setState({ redirect: `/` });
            })
            .catch(errorResponse => {
                console.error(errorResponse);
                alert(`Error: ${errorResponse}`);
            });
    }

    setStatus = (value) => {
        fetch(`https://localhost:3000/api/applications/${this.props.match.params.id}`, {
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
                alert("Status Changed")
                this.setState({ redirect: `/` });
            })
            .catch(errorResponse => {
                console.error(errorResponse);
                alert(`Error: ${errorResponse}`);
            });
    }

    render() {
        const application = this.state.application;
        if (!this.state.application) {
            return <h3>Loading application...</h3>
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        if (this.context.user.role === 'admin') {
            return (

                <>
                    <PageHeader
                        onBack={() => window.history.back()}
                        className="site-page-header-ghost-wrapper"
                        title={`Application ID:${application[0].id}`}
                    />
                    <div>
                        <Descriptions
                            bordered
                            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >
                            <Descriptions.Item label="Company Name">{application[0].companyname}</Descriptions.Item>
                            <Descriptions.Item label="Address">{application[0].address}</Descriptions.Item>
                            <Descriptions.Item label="Company Number">{application[0].companynumber}</Descriptions.Item>
                            <Descriptions.Item label="Date Registered">{application[0].dateregistered}</Descriptions.Item>
                            <Descriptions.Item label="SIC">{application[0].sic}</Descriptions.Item>
                            <Descriptions.Item label="Status">{application[0].status}</Descriptions.Item>
                            <Descriptions.Item label="Creator">{this.context.user.firstname + this.context.user.lastname}</Descriptions.Item>
                        </Descriptions>
                    </div>

                    <div style={{ paddingTop: '2rem' }}>
                            <Form {...formItemLayout} style={{display: 'flex', justifyContent: 'center'}} name="setStatus" onFinish={this.setStatus} scrollToFirstError>
                            <Form.Item name="status" style={{width: '30%'}}>
                                <Select
                                    placeholder="Change Status"
                                    onChange={this.onStatusChange}
                                    allowClear>
                                    <Option value="pending">Pending</Option>
                                    <Option value="accepted">Accepted</Option>
                                    <Option value="rejected">Rejected</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout} >
                                <Button type="primary" htmlType="submit">Change</Button>
                            </Form.Item>
                        </Form>
                    </div>

                    <Steps current={this.state.progress} style={{height: "60vh", paddingTop: "5rem" }}>
                        <Step title="New" description="This is a description." />
                        <Step title="Pending" description="This is another description" />
                        <Step title="Accepted/Rejected" description="This is another description" status={this.state.statusApp} />
                    </Steps>
                </>
            );
        }
        return (
            <>
                <PageHeader
                    onBack={() => window.history.back()}
                    className="site-page-header-ghost-wrapper"
                    title={`Application ID:${application[0].id}`}
                />
                <Tabs defaultActiveKey='1' onChange={this.callback}>
                    <TabPane tab="Application Details" key="1">
                        <div>
                            <Descriptions
                                bordered
                                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            >
                                <Descriptions.Item label="Company Name">{application[0].companyname}</Descriptions.Item>
                                <Descriptions.Item label="Address">{application[0].address}</Descriptions.Item>
                                <Descriptions.Item label="Company Number">{application[0].companynumber}</Descriptions.Item>
                                <Descriptions.Item label="Date Registered">{application[0].dateregistered}</Descriptions.Item>
                                <Descriptions.Item label="SIC">{application[0].sic}</Descriptions.Item>
                                <Descriptions.Item label="Status">{application[0].status}</Descriptions.Item>
                                <Descriptions.Item label="Creator">{this.context.user.firstname + this.context.user.lastname}</Descriptions.Item>
                            </Descriptions>
                        </div>
                    </TabPane>
                    <TabPane tab="Edit Application" key="2">
                        <div>
                            <Form {...formItemLayout} name="editApplication" onFinish={this.onFinish} scrollToFirstError>
                                <Form.Item name="companyname" label="Company Name" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="address" label="Address">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="companynumber" label="Company Number">
                                    <Input />
                                </Form.Item>
                                <Form.Item name="sic" label="sic">
                                    <Input />
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout} >
                                    <Button type="primary" htmlType="submit">Edit</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </TabPane>
                </Tabs>

                <Steps current={this.state.progress} style={{ paddingBottom: "27rem", paddingTop: "5rem" }}>
                    <Step title="New" description="This is a description." />
                    <Step title="Pending" description="This is another description" />
                    <Step title="Accepted/Rejected" description="This is another description" status={this.state.statusApp} />
                </Steps>
            </>
        );
    }

}

export default withRouter(Application);