import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";
import Pagination from "./components/Pagination";

function App() {
	const axios = require('axios');

	const [tasks, setTasks] = useState([])
	const [currentTasks, setCurrentTasks] = useState(tasks)
	const [pagesCount, setPagesCount] = useState(1)
	const [optionsType, setOptionsType] = useState('all')
	const [sortType, setSortType] = useState('asc')
	const [currentPage, setCurrentPage] = useState(1)
	const [update, setUpdate] = useState([])

	const tasksOnPage = 10
	const apiUrl = 'https://todo-api-learning.herokuapp.com/v1';
	const userId = 1

	useEffect(() => {
		axios.get(`${apiUrl}/tasks/${userId}`, {
			params: {
				filterBy: optionsType === 'all' ? '' : optionsType,
				order: sortType,
				pp: tasksOnPage,
				page: currentPage
			}
		}).then(response => {
			let updatedPagesCount = Math.ceil(response.data.count / tasksOnPage)
			if (updatedPagesCount < 1 && optionsType !== 'all') {
				setOptionsType('all')
			}
			if (updatedPagesCount < 1) {
				updatedPagesCount = 1
			}
			setPagesCount(updatedPagesCount)

			if (currentPage > updatedPagesCount) {
				setCurrentPage(updatedPagesCount)
			}

			setCurrentTasks(response.data.tasks)
			setTasks(response.data.tasks)
		}, err => {
			console.log(err)
		})

	}, [currentPage, optionsType, sortType, update])


	// tasks
	function deleteTask(taskId) {
		axios.delete(`${apiUrl}/task/${userId}/${taskId}`).then(
			() => {
				setUpdate([])
			}, (err) => {
				console.log(err)
			}
		)
	}

	function addTask(text) {
		const newTask = {
			done: false,
			name: text,
		}
		axios.post(`${apiUrl}/task/${userId}`, newTask).then(
			() => {
				setUpdate([])
			}, (err) => {
				console.log(err)
			}
		)
	}

	function editTask(taskId, text) {
		const editedTask = { name: text }
		axios.patch(`${apiUrl}/task/${userId}/${taskId}`, editedTask).then(
			() => {
				setUpdate([])
			}, (err) => {
				console.log(err)
			}
		)
	}

	function completeTask(taskId, complete) {
		const editedTask = { done: complete }
		axios.patch(`${apiUrl}/task/${userId}/${taskId}`, editedTask).then(
			() => {
				setUpdate([])
			}, (err) => {
				console.log(err)
			}
		)
	}


	// filter
	function showTasksWithOption(type) {
		setOptionsType(type)
	}

	function sortTasks(type) {
		setSortType(type)
	}


	// pagination
	function changeCurrentPage(pageNumber) {
		setCurrentPage(pageNumber)
	}

	return (
		<div className="centered centered_styles">
			<header className="header">
				<h1>ToDo</h1>
			</header>
			<AddTask addTask={addTask} />

			<Sorting
				showTasksWithOption={showTasksWithOption}
				sortTasks={sortTasks}
				optionsType={optionsType}
				sortType={sortType}
			/>

			<main className="main">
				<TasksList
					posts={currentTasks}
					editTask={editTask}
					deleteTask={deleteTask}
					completeTask={completeTask}
				/>
			</main>

			<nav className="pages">
				<div className="pages__block pages__block_dark">
					<Pagination
						pagesCount={pagesCount}
						changeCurrentPage={changeCurrentPage}
						currentPage={currentPage}
					/>
				</div>
			</nav>
		</div>
	);
}

export default App;
