import React from 'react';
import { withRouter } from 'react-router';
import { Steps, PageHeader, Descriptions } from 'antd';
import UserContext from '../contexts/user';
import { status, json } from '../utilities/requestHandlers';

const { Step } = Steps;

class Account extends React.Component {
    static contextType = UserContext;

    render() {
        return (
            <>
                <PageHeader
                    onBack={() => window.history.back()}
                    className="site-page-header-ghost-wrapper"
                    title={`Account details page of: ${this.context.user.username}`}
                />
                <div>
                    <Descriptions
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="First Name">{this.context.user.firstname}</Descriptions.Item>
                        <Descriptions.Item label="Last Name">{this.context.user.lastname}</Descriptions.Item>
                        <Descriptions.Item label="Username">{this.context.user.username}</Descriptions.Item>
                        <Descriptions.Item label="Registered on">{this.context.user.dateregistered}</Descriptions.Item>
                    </Descriptions>
                </div>
            </>
        );
    }

}

export default withRouter(Account);