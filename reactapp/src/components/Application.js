import React from 'react';
import { useParams } from 'react-router-dom';
import { Steps, PageHeader, Descriptions } from 'antd';

const { Step } = Steps;

function Application(props) {
    let { id } = useParams();
    return (
        <>
            <PageHeader
                onBack={() => window.history.back()}
                className="site-page-header-ghost-wrapper"
                title={`Application ID: ${id}`}
            />
            <div>
                <Descriptions
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="Address">Cloud Database</Descriptions.Item>
                    <Descriptions.Item label="Company Number">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="Date Registered">18:00:00</Descriptions.Item>
                    <Descriptions.Item label="SIC">$80.00</Descriptions.Item>
                    <Descriptions.Item label="Status">$20.00</Descriptions.Item>
                    <Descriptions.Item label="Creator">$60.00</Descriptions.Item>
                </Descriptions>
            </div>

            <Steps current={2} style={{paddingBottom: "27rem", paddingTop: "5rem" }}>
                <Step title="New" description="This is a description." />
                <Step title="Pending" description="This is another description"/>
                <Step title="Accepted/Rejected" description="This is another description" status="error" />
            </Steps>
        </>
    );
}

export default Application;