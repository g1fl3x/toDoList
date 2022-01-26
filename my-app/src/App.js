import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";
import { message, Pagination, Space, Divider } from 'antd'


// npm run deploy

function App() {
	const axios = require('axios');

	const [tasks, setTasks] = useState([])
	const [tasksLen, setTasksLen] = useState(0)
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

		if (updatedPagesCount < 1) {
			updatedPagesCount = 1
		}
		setTasksLen(response.data.count)

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
		} catch (e) {
			return "Json parse error"
		}
		if (errorText === undefined) {
			return "Json doesn't contain error text"
		}
		message.error(errorText, 3)
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
			handlerError(err)
			return { data: [] }
		}
	}

	async function deleteTask(taskId) {
		try {
			await axios.delete(`${apiUrl}/task/${userId}/${taskId}`)
		} catch (err) {
			handlerError(err)
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
			handlerError(err)
		}
		setUpdate([])
	}

	async function editTask(taskId, text) {
		const editedTask = { name: text }
		try {
			await axios.patch(`${apiUrl}/task/${userId}/${taskId}`, editedTask)
		} catch (err) {
			handlerError(err)
		}
		setUpdate([])
	}

	async function completeTask(taskId, complete) {
		const editedTask = { done: complete }
		try {
			await axios.patch(`${apiUrl}/task/${userId}/${taskId}`, editedTask)
		} catch (err) {
			handlerError(err)
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
			<Divider>
				<h2>ToDo</h2>
			</Divider>
			<Space direction="vertical" style={{ width: '100%' }}>
				<AddTask addTask={addTask} />

				<Sorting
					showTasksWithOption={showTasksWithOption}
					sortTasks={sortTasks}
				/>

				<main>
					<TasksList
						posts={tasks}
						editTask={editTask}
						deleteTask={deleteTask}
						completeTask={completeTask}
					/>
				</main>

				<Divider dashed={true}>
					<Pagination
						total={tasksLen}
						pageSize={tasksOnPage}
						onChange={changeCurrentPage}
						current={currentPage}
						hideOnSinglePage={true}
					/>
				</Divider>
			</Space>
		</div>
	);
}

export default App;
