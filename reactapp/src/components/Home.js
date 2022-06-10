import { PageHeader, Input } from "antd";
import ApplicationGrid from './Applicationgrid';

const { Search } = Input;

function Home(props) {
    return (
        <>
            <div className="site-layout-content">
                <div style={{ padding: '2% 20%' }}>
                    <Search 
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={null} />
                    <PageHeader
                        className="site-page-header"
                        title="The Trading Department"
                        subTitle="Welcome to the TD." />
                </div>
                <ApplicationGrid />
            </div>
        </>
    )
}

export default Home;