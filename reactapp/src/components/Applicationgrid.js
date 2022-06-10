import React from 'react';
import { Row, Col } from "antd";
import ApplicationCard from "./ApplicationCard";
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

class ApplicationGrid extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            applications: []
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
            .catch(err => console.log("error fetching articles", err));
        } else {
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

    render() {
        if(!this.state.applications.length) {
            return <h3 style={{textAlign: 'center', height: '65vh'}}>You don't have any application submitted.</h3>
        }

        const cardList = this.state.applications.map(application => {
            return (
                <div style={{padding:"10px"}} key={application.id}>
                    <Col span={6}>
                        <ApplicationCard {...application}/>
                    </Col>
                </div>
            )
        });

        return (
            <Row type="flex" justify="space-around">
                {cardList}
            </Row>
        );
    }
}


export default ApplicationGrid;