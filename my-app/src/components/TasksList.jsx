import Task from './Task.jsx'
import { Row, Col } from 'antd';

function TasksList({ posts, updateTask, deleteTask }) {

    return (
        <Row gutter={[0, 2]}>
            {posts.map(post =>
                <Col className="gutter-row" span={24} key={post.uuid}>
                    <Task
                        post={post}
                        key={post.uuid}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                    />
                </Col>)}
        </Row>
    );
}

export default TasksList;