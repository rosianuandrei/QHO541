import { Card, Row, Col } from "antd";
const { Meta } = Card;

function ApplicationGrid(props) {
    return (
        <>
            <Row type="flex" justify="space-around">
                <Col span={6}>
                    <Card cover={<img alt="test" src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" />}>
                        <Meta title="First Application" description="This is about something" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card cover={<img alt="test" src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" />}>
                        <Meta title="Second Application" description="This is about something" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card cover={<img alt="test" src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" />}>
                        <Meta title="Third Application" description="This is about something" />
                    </Card>
                </Col>
            </Row>
            <Row type="flex" justify="space-around">
                <Col span={6}>
                    <Card cover={<img alt="test" src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" />}>
                        <Meta title="Fourth Application" description="This is about something" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card cover={<img alt="test" src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" />}>
                        <Meta title="Fifth Application" description="This is about something" />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card cover={<img alt="test" src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg" />}>
                        <Meta title="Sixth Application" description="This is about something" />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ApplicationGrid;