import SortingButton from './SortingButton';
import { Typography, Row, Col, Space, Radio } from 'antd';

const { Text } = Typography

function Sorting({ showTasksWithOption, sortTasks, sortType }) {

    function onOptionSelect(e) {
        showTasksWithOption(e.target.value.toLowerCase())
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
                    {["asc", "desc"]
                        .map((el, i) =>
                            <SortingButton
                                key={i}
                                type={el}
                                selected={el === sortType ? true : false}
                                sortTasks={sortTasks}
                            />)}
                </Space>
            </Col>
        </Row>

    );
}

export default Sorting;
