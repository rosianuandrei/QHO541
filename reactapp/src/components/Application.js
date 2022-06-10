import React from 'react';
import { withRouter } from 'react-router';
import { Steps, PageHeader, Descriptions } from 'antd';
import { status, json } from '../utilities/requestHandlers';

const { Step } = Steps;

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: undefined
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://localhost:3000/api/applications/${id}`)
        .then(status)
        .then(json)
        .then(data => {
            this.setState({ application: data })
        })
        .catch(err => console.log("error fetching articles", err));
    }
    
    render() {
        const application = this.state.application;
        if(!this.state.application) {
            return <h3>Loading application...</h3>
        }
        console.log(this.state);
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
    
}

export default withRouter(Application);