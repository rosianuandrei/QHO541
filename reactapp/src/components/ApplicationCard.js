import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

class ApplicationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 0
        }
        this.handleNav = this.handleNav.bind(this);
    }

    handleNav() {
        this.setState({clicked: clicked++});
        console.log(this.state.clicked);
    }

    render() {
        return (
            <Card
                style={{ width: 320 }}
                cover={<img alt="test" src={this.props.imgURL} onClick={this.handleNav} />}
                hoverable={true}>

                <Meta title={this.props.title} description={this.props.summary} />
            </Card>
        );
    }
}

export default ApplicationCard;