import React from 'react';
import { Row, Col } from "antd";
import ApplicationCard from "./ApplicationCard";

import UserContext from '../contexts/user';

class ApplicationGrid extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        console.log(props);
    }

    

    render() {
        if(!this.props.applications.length) {
            return <h3 style={{textAlign: 'center', height: '65vh'}}>You don't have any application submitted.</h3>
        }

        const cardList = this.props.applications.map(application => {
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