import OptionsButton from './OptionsButton';
import SortingButton from './SortingButton';
import { Typography, Row, Col, Space } from 'antd';

const { Text } = Typography

function Sorting({ showTasksWithOption, sortTasks, optionsType, sortType }) {
    return (
        <Row justify="space-between">
            <Col flex="auto">
                <Space align="center">
                    {["All", "Done", "Undone"]
                        .map((el, i) =>
                            <OptionsButton
                                key={i}
                                text={el}
                                selected={el.toLowerCase() === optionsType ? true : false}
                                showTasksWithOption={showTasksWithOption}
                            />)}
                </Space>
            </Col>
            <Col flex="auto" style={{textAlign: 'right'}}>
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
