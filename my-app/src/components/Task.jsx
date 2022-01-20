import { useState } from 'react';
import delete_img from '../images/icons/delete.svg'

function Task({ post, editTask, deleteTask, completeTask }) {

	const [editMode, setEditMode] = useState(false);
	const [taskText, setTaskText] = useState(post.text);
	let isTaskCompleted = post.completed
	let edited = false

	function handleOnBlur() {
		setEditMode(false)
		if (!edited)
			setTaskText(post.text)
		edited = false
	}

	function handleOnClick() {
		setEditMode(true)
	}

	function handleOnChange(e) {
		setTaskText(e.currentTarget.value)
	}

	function handleKeyDown(event) {
		if (event.keyCode === 13) {
			editTask(post.id, event.currentTarget.value)
			edited = true
			event.currentTarget.blur()
		}
		if (event.keyCode === 27) {
			setTaskText(post.text)
			event.currentTarget.blur()
		}
	}

	function onCheckboxClicked() {
		isTaskCompleted = !isTaskCompleted
		completeTask(post.id, isTaskCompleted)
	}

	const lookView = (
		<div className="post__text" >
			<div
				className="post__text-input post__text-input_dark"
				onClick={handleOnClick}
			>
				{taskText}
			</div>
		</div>
	);

	const editView = (
		<div className="post__text">
			<input
				className="post__text-input post__text-input_dark"
				value={taskText}
				onBlur={handleOnBlur}
				onChange={handleOnChange}
				onKeyDown={handleKeyDown}
				autoFocus={true}
			/>
		</div>
	);

	return (
		<article className="post">
			<div className="post__apply">
				<input
					className="post__apply-checkbox"
					checked={isTaskCompleted}
					onClick={onCheckboxClicked}
					onChange={() => 1}
					type="checkbox"
				/>
			</div>
			{editMode ? editView : lookView}
			<time
				className="post__time post__time_size_s"
				dateTime="2022-01-03 19:30"
			>
				{new Date(post.time)
					.toLocaleDateString("us-EN",
						{ dateStyle: "medium" }
					)
				}
			</time>
			<button
				className="post__delete"
				onClick={() => deleteTask(post.id)}
			>
				<img
					className="post__delete-image"
					src={delete_img}
				/>
			</button>
		</article>
	);
}

export default Task;