import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

class ApplicationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: props.id
        }
        this.handleNav = this.handleNav.bind(this);
    }

    handleNav() {
        this.setState({ clicked: this.props.id });
    }

    render() {
        return (
            <Link to={`/application/${this.props.id}`} {...this.props}>
                <Card
                    style={{ width: 320 }}

                    hoverable={true}>

                    <Meta title={this.props.companyname} description={`Status: ${this.props.status}`} />
                </Card>
            </Link>
        );
    }
}

export default ApplicationCard;