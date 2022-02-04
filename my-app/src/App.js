import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";
import { message, Pagination, Space, Divider } from 'antd'
import { useNavigate } from "react-router-dom";

// npm run deploy
const axios = require('axios')

// errorHandler
axios.interceptors.response.use(
	(response) => response,
	(err) => {
		const response = err.request.response
		let errorText
		if (!response) {
			errorText = "Internal Error"
		}
		try {
			errorText = JSON.parse(response).message
		} catch (e) {
			errorText = "Json doesn't contain error text"
		}
		message.error(`${errorText}`, 3)
		return err
	});

function App() {
	const navigate = useNavigate('/')
	const [tasks, setTasks] = useState([])
	const [tasksLen, setTasksLen] = useState(0)
	const [optionsType, setOptionsType] = useState('all')
	const [sortType, setSortType] = useState('asc')
	const [currentPage, setCurrentPage] = useState(1)
	const [update, setUpdate] = useState([])

	const tasksOnPage = 5
	// const apiUrl = 'https://todo-api-learning.herokuapp.com/v1';
	const apiUrl = 'http://127.0.0.1:3000/api'
	// const apiUrl = 'https://my-todo-app228.herokuapp.com/api'
	const userId = 1

	useEffect(async () => {
		//navigate('/login')
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


	// tasks
	async function getTasks(filterBy, order, pp, page) {
		const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
			params: {
				filterBy: filterBy,
				order: order,
				pp: pp,
				page: page
			}
		})

		// no response
		if (!response.data) return { data: { count: 0, tasks: [] } }
		return response
	}

	async function deleteTask(taskId) {
		await axios.delete(`${apiUrl}/task/${userId}/${taskId}`)
		setUpdate([])
	}

	async function addTask(text) {
		const newTask = {
			done: false,
			name: text,
		}
		await axios.post(`${apiUrl}/task/${userId}`, newTask)
		setUpdate([])
	}

	async function updateTask(taskId, editedTask) {
		const response = await axios.patch(`${apiUrl}/task/${userId}/${taskId}`, editedTask)
		setUpdate([])
		return response
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
			<Space direction="vertical" style={{ width: '100%' }}>
				<AddTask addTask={addTask} />

				<Sorting
					showTasksWithOption={showTasksWithOption}
					sortTasks={sortTasks}
				/>

				<main>
					<TasksList
						posts={tasks}
						updateTask={updateTask}
						deleteTask={deleteTask}
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
