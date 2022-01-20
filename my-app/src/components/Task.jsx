import { useState } from 'react';
import delete_img from '../images/icons/delete.svg'

function Task(props) {

	const [editMode, setEditMode] = useState(false);
	const [taskText, setTaskText] = useState(props.post.text);
	let isTaskCompleted = props.post.completed
	let edited = false

	function handleOnBlur(event) {
		setEditMode(false)
		if (!edited)
			setTaskText(props.post.text)
		edited = false
	}

	function handleOnClick() {
		setEditMode(true)
	}

	function handleOnChange(e) {
		setTaskText(e.currentTarget.value)
	}

    function handleKeyDown(event) {
		console.log(event.currentTarget.value)
        if (event.keyCode === 13) {
            props.editTaskCallback(props.post.id, event.currentTarget.value)
			edited = true
			event.currentTarget.blur()
        }
		if (event.keyCode === 27) {
			setTaskText(props.post.text)
			event.currentTarget.blur()
		}
    }

	function onCheckboxClicked() {
		isTaskCompleted = !isTaskCompleted
		props.completeTaskCallback(props.post.id, isTaskCompleted)
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
				className = "post__text-input post__text-input_dark"
				value = {taskText}
				onBlur = {handleOnBlur}
				onChange = {handleOnChange}
				onKeyDown = {handleKeyDown}
				autoFocus = {true} 
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
			>{new Date(props.post.time).toLocaleDateString("us-EN", {dateStyle:"medium"})}</time>
			<button
				className="post__delete"
				onClick={() => props.deleteTaskCallback(props.post.id)}
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