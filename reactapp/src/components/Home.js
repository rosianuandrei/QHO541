import { PageHeader, Input, Button, Typography, Select } from "antd";
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';
import ApplicationGrid from './Applicationgrid';
import { status, json } from '../utilities/requestHandlers';
import React from 'react';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;



class Home extends React.Component{
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            applications: [],
            searchfield: '',
            statusField: ''
        }
    }

    componentDidMount() {
        if (this.context.user.role === 'admin') {
            fetch('https://localhost:3000/api/applications', {
            method: "GET",
            headers: {
                "Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password)
            }
            })
            .then(status)
            .then(json)
            .then(data => {
                this.setState({ applications: data })
            })
            .catch(err => console.log("error fetching applications", err));
        } else if (this.context.user.role === 'user') {
            fetch(this.context.user.links.applications, {
            method: "GET",
            headers: {
                "Authorization": "Basic " + window.btoa(this.context.user.username + ":" + this.context.user.password)
            }
            })
            .then(status)
            .then(json)
            .then(data => {
                this.setState({ applications: data })
            })
            .catch(err => console.log("error fetching applications", err));
        }
        
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    onStatusSearch = (value) => {
        switch (value) {
            case 'new':
                this.setState({ statusField: 'new' })
                return;
            case 'pending':
                this.setState({ statusField: 'pending' });
                return;
            case 'accepted':
                this.setState({ statusField: 'accepted' });
                return;
            case 'rejected':
                this.setState({ statusField: 'rejected' });
                return;
            default:
                this.setState({ statusField: '' });
                return;
        }
    }

    render() {

        const { applications, searchfield, statusField } = this.state;
        let filteredApplications = applications.filter(applications => {
            return applications.companyname.toLowerCase().includes(searchfield.toLowerCase());
        }).filter(applications => {
            return applications.status.toLowerCase().includes(statusField.toLowerCase());
        })

        if (this.context.user.loggedIn) {
            if(this.context.user.role === 'admin')
            { 
                return (
                    <>
                        <div className="site-layout-content">
                            <div style={{ padding: '2% 20%' }}>
                                <Search 
                                    placeholder="input search text"
                                    allowClear
                                    enterButton="Search"
                                    size="large"
                                    onChange={this.onSearchChange} />
                                <Select
                                placeholder="Filter Applications"
                                onChange={this.onStatusSearch}
                                allowClear>
                                    <Option value="new">New</Option>
                                    <Option value="pending">Pending</Option>
                                    <Option value="accepted">Accepted</Option>
                                    <Option value="rejected">Rejected</Option>
                                </Select>
                                <PageHeader
                                    className="site-page-header"
                                    title="The Trading License Department"
                                    subTitle="Welcome to the TLD." />
                            </div>
                            <ApplicationGrid application={filteredApplications}/>
                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        <div className="site-layout-content">
                            <div style={{ padding: '2% 20%' }}>
                                <PageHeader
                                    className="site-page-header"
                                    title="The Trading License Department"
                                    subTitle="Welcome to the TLD." />
                            </div>
                            <ApplicationGrid application={filteredApplications}/>
                        </div>
                    </>
                )
            }
            
        } else {
            return (
                <>
                    <div className="site-layout-content" style={{height: '85vh'}}>
                        <Title style={{textAlign: 'center', paddingTop: "5rem", paddingBottom: "5rem"}}>Trading License Department</Title>
                        <Title level={5} style={{textAlign: 'center', paddingBottom: "3rem"}}>To submit applications or to see the status of a submitted application, please login first.</Title>

                        <div style={{display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center'}}>
                            <Button type="primary" style={{width: '8rem', marginBottom: "1rem"}}><Link to='/login'>Login</Link></Button>
                            <Button type="link"><Link to ='/register'>I don't have an account. Register</Link></Button>
                        </div>
                    </div>
                    
                </>
            )
        }
    }
    
    
}

export default Home;