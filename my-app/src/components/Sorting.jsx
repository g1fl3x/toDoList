import { Typography, Row, Col, Space, Radio, Switch } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography

function Sorting({ showTasksWithOption, sortTasks }) {

    function onOptionSelect(e) {
        showTasksWithOption(e.target.value.toLowerCase())
    }

    function onSortClick(state) {
        sortTasks(state ? "asc" : "desc")
    }

    return (
        <Row justify="space-between">
            <Col flex="auto">
                <Radio.Group defaultValue="All" buttonStyle="solid" onChange={onOptionSelect}>
                    <Radio.Button value="All">All</Radio.Button>
                    <Radio.Button value="Done">Done</Radio.Button>
                    <Radio.Button value="Undone">Undone</Radio.Button>
                </Radio.Group>
            </Col>
            <Col flex="auto" style={{ textAlign: 'right' }}>
                <Space align="center">
                    <Text>
                        Sort:
                    </Text>
                    <Switch
                        checkedChildren={<ArrowUpOutlined />}
                        unCheckedChildren={<ArrowDownOutlined />}
                        defaultChecked
                        onClick={onSortClick}
                    />
                </Space>
            </Col>
        </Row>

    );
}

export default Sorting;
