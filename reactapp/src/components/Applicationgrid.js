import React from 'react';
import { Row, Col } from "antd";
import ApplicationCard from "./ApplicationCard";

class ApplicationGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: []
        }
    }

    componentDidMount() {
        this.setState({
            applications: require('../data/applications.json')
        })
    }

    render() {
        if(!this.state.applications.length) {
            return <h3>Loading applications...</h3>
        }

        const cardList = this.state.applications.map(application => {
            return (
                <div style={{padding:"10px"}} key={application.id}>
                    <Col span={6}>
                        <ApplicationCard {...application} />
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