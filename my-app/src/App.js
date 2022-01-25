import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";
import Pagination from "./components/Pagination";

// npm run deploy

function App() {
	const axios = require('axios');

	const [tasks, setTasks] = useState([])
	const [pagesCount, setPagesCount] = useState(1)
	const [optionsType, setOptionsType] = useState('all')
	const [sortType, setSortType] = useState('asc')
	const [currentPage, setCurrentPage] = useState(1)
	const [update, setUpdate] = useState([])

	const tasksOnPage = 5
	const apiUrl = 'https://todo-api-learning.herokuapp.com/v1';
	const userId = 1

	useEffect(async () => {
		const response = await getTasks(optionsType, sortType, tasksOnPage, currentPage)
		let updatedPagesCount = Math.ceil(response.data.count / tasksOnPage)
		// if (updatedPagesCount < 1 && optionsType !== 'all') {
		// 	setOptionsType('all')
		// }
		if (updatedPagesCount < 1) {
			updatedPagesCount = 1
		}
		setPagesCount(updatedPagesCount)

		if (currentPage > updatedPagesCount) {
			setCurrentPage(updatedPagesCount)
		}

		setTasks(response.data.tasks)

	}, [currentPage, optionsType, sortType, update])


	// errors
	function handlerError(err) {
		const response = err.request.response
		let errorText
		if (response === undefined) {
			return "Internal Error"
		}
		try {
			errorText = JSON.parse(response).message
		} catch(e) {
			return "Json parse error"
		}
		if (errorText === undefined) {
			return "Json doesn't contain error text"
		}
		return errorText
	}


	// tasks
	async function getTasks(filterBy, order, pp, page) {
		try {
			const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
				params: {
					filterBy: filterBy === 'all' ? '' : filterBy,
					order: order,
					pp: pp,
					page: page
				}
			})
			return response
		} catch (err) {
			alert(handlerError(err))
			return { data: [] }
		}
	}

	async function deleteTask(taskId) {
		try {
			await axios.delete(`${apiUrl}/task/${userId}/${taskId}`)
		} catch (err) {
			alert(err)
		}
		setUpdate([])
	}

	async function addTask(text) {
		const newTask = {
			done: false,
			name: text,
		}
		try {
			await axios.post(`${apiUrl}/task/${userId}`, newTask)
		} catch (err) {
			alert(handlerError(err))
		}
		setUpdate([])
	}

	async function editTask(taskId, text) {
		const editedTask = { name: text }
		try {
			await axios.patch(`${apiUrl}/task/${userId}/${taskId}`, editedTask)
		} catch (err) {
			alert(handlerError(err))
		}
		setUpdate([])
	}

	async function completeTask(taskId, complete) {
		const editedTask = { done: complete }
		try {
			await axios.patch(`${apiUrl}/task/${userId}/${taskId}`, editedTask)
		} catch (err) {
			alert(handlerError(err))
		}
		setUpdate([])
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
					posts={tasks}
					editTask={editTask}
					deleteTask={deleteTask}
					completeTask={completeTask}
				/>
			</main>

			<nav className="pages">
				<div className="pages__block pages__block_dark">
					<Pagination
						pagesCount={pagesCount === 1 ? 0 : pagesCount}
						changeCurrentPage={changeCurrentPage}
						currentPage={currentPage}
					/>
				</div>
			</nav>
		</div>
	);
}

export default App;
