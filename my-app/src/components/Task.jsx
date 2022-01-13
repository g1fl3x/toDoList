import { useState } from 'react';
import delete_img from '../images/icons/delete.svg'

function Task(props) {

	const [editMode, setEditMode] = useState(false);
	const [taskText, setTaskText] = useState(props.post.text);

	function handleOnBlur() {
		setEditMode(false)
	}

	function handleOnClick() {
		setEditMode(true)
	}

	function handleOnChange(e) {
		setTaskText(e.currentTarget.value);
		props.editTaskCallback(props.post.id, taskText);
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
				autoFocus = {true} 
			/>
		</div>
	);

    return (
      	<article className="post">
			<div className="post__apply"><input className="post__apply-checkbox" type="checkbox" /></div>
			
			{editMode ? editView : lookView}

			<time className="post__time post__time_size_s" dateTime="2022-01-03 19:30">{props.post.time}</time>
			<button  className="post__delete" onClick={() => props.deleteTaskCallback(props.post.id)}>
				<img className="post__delete-image" src={delete_img} />
			</button>
		</article>
    );
  }
  
  export default Task;