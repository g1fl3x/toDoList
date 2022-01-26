import { Checkbox, Typography, Row, Col, Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { useState } from 'react';

const { Text } = Typography;

function Task({ post, deleteTask, updateTask }) {
	const [taskText, setTaskText] = useState(post.name);
	let isTaskCompleted = post.done

	// utils
	const dateToString = (createdAt) => {
		return `${createdAt.getHours()}:${createdAt.getMinutes() < 10
				? '0' + createdAt.getMinutes()
				: createdAt.getMinutes()
			} ${createdAt.getDate()}/${createdAt.getMonth() < 9
				? '0' + (createdAt.getMonth() + 1)
				: createdAt.getMonth() + 1
			}/${createdAt.getFullYear()} `;
	};


	// handlers
	function handleOnDelete(e) {
		if (!e.currentTarget.disabled) {
			e.currentTarget.disabled = true
			deleteTask(post.uuid)
		}
	}

	function handleOnTaskEdit(taskText) {
		const clearedText = taskText.trim()
		if (clearedText !== "") {
			setTaskText(clearedText)
			updateTask(post.uuid, clearedText)
		}
	}

	function onCheckboxClicked() {
		isTaskCompleted = !isTaskCompleted
		updateTask(post.uuid, null, isTaskCompleted)
	}

	return (
		<Row justify="space-around" align="top" >
			<Col flex="36px">
				<Checkbox
					className="post__apply-checkbox"
					checked={isTaskCompleted}
					onClick={onCheckboxClicked}
				/>
			</Col>
			<Col flex="auto">
				<Text editable={{
					onChange: handleOnTaskEdit,
					triggerType: 'text'
				}}>
					{taskText}
				</Text>
			</Col>
			<Col flex="120px" style={{ height: 36 }}>
				<Text>
					{dateToString(new Date(post.createdAt))}
				</Text>
			</Col>
			<Col flex="24px">
				<Button
					type="primary"
					icon={<DeleteFilled />}
					size='small'
					onClick={handleOnDelete}
				/>
			</Col>
		</Row>
	);
}

export default Task;