import { Card, Row, Col } from "antd";

import { Link } from 'react-router-dom';
const { Meta } = Card;

function ApplicationGrid(props) {
    return (
        <>
            <Row type="flex" justify="space-around">
                <Col span={6}>
                    <Link to="/application/1">
                        <Card cover={<img alt="test" src="https://pngimg.com/uploads/whatsapp/small/whatsapp_PNG95162.png" />}>
                            <Meta title="First Application" description="This is about something" />
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/application/2">
                        <Card cover={<img alt="test" src="https://pngimg.com/uploads/whatsapp/small/whatsapp_PNG95162.png" />}>
                            <Meta title="First Application" description="This is about something" />
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/application/3">
                        <Card cover={<img alt="test" src="https://pngimg.com/uploads/whatsapp/small/whatsapp_PNG95162.png" />}>
                            <Meta title="First Application" description="This is about something" />
                        </Card>
                    </Link>
                </Col>
            </Row>
            <Row type="flex" justify="space-around">
                <Col span={6}>
                    <Link to="/application/4">
                        <Card cover={<img alt="test" src="https://pngimg.com/uploads/whatsapp/small/whatsapp_PNG95162.png" />}>
                            <Meta title="First Application" description="This is about something" />
                        </Card>
                </Col>
                <Col span={6}>
                    <Link to="/application/5">
                        <Card cover={<img alt="test" src="https://pngimg.com/uploads/whatsapp/small/whatsapp_PNG95162.png" />}>
                            <Meta title="First Application" description="This is about something" />
                        </Card>
                    </Link>
                </Col>
                <Col span={6}>
                    <Link to="/application/6">
                        <Card cover={<img alt="test" src="https://pngimg.com/uploads/whatsapp/small/whatsapp_PNG95162.png" />}>
                            <Meta title="First Application" description="This is about something" />
                        </Card>
                    </Link>
                </Col>
            </Row>
        </>
    );
}

export default ApplicationGrid;