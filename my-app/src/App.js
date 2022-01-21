import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";
import Pages from "./components/Pages";

function App() {
	const [tasks, setTasks] = useState([
		{ uuid: "sdfghsdfgfdsg", done: true, name: "Text example", createdAt: 1642676319020, updatedAt: 1642676319020 },
		{ uuid: "sdfghsdfgdsfjkg", done: false, name: "Create reactJs App", createdAt: 1642676319056, updatedAt: 1642676319056 },
		{ uuid: "isgfgsdfsd", done: false, name: "Fix code", createdAt: 1642676319017, updatedAt: 1642676319017 }
	])

	const axios = require('axios');

	const tasksOnPage = 10
	const serverUrl = "https://todo-api-learning.herokuapp.com/v1"
	const userId = 1

	// const [tasks, setTasks] = useState([])
	const [currentTasks, setCurrentTasks] = useState(tasks)
	const [pagesCount, setPagesCount] = useState(1)
	const [optionsType, setOptionsType] = useState('All')
	const [sortType, setSortType] = useState('classicSort')
	const [currentPage, setCurrentPage] = useState(1)
	const [appState, setAppState] = useState('fisrt start')

	useEffect(() => {

		const response = axios.get(`${serverUrl}/tasks/${userId}`)
		response.then(
			(response) => {
				setTasks(response.data)
				const filteredTasks = response.data.filter(item => optionsFilter(item, optionsType))
				const filteredTasksLen = filteredTasks.length
		
				const outputTasks = filteredTasks
					.sort((a, b) => sortFilter(a, b, sortType))
					.slice((currentPage - 1) * tasksOnPage, currentPage * tasksOnPage)
		
				const pagesFloat = filteredTasksLen / tasksOnPage
				let pagesCount = filteredTasksLen % tasksOnPage === 0 ? pagesFloat : Math.floor(pagesFloat) + 1
				if (pagesCount < 1) {
					setOptionsType('All') // go to all screen
					pagesCount = 1
				}
				if (pagesCount < currentPage) {
					setCurrentPage(pagesCount)
				}
		
				setPagesCount(pagesCount)
				setCurrentTasks(outputTasks)
			}, (err) => {
				console.log(err)
			}
		)

	}, [setAppState, currentPage, sortType, optionsType])

	// utils
	function rangomStringId(size) {
		let rnd = '';
		while (rnd.length < size)
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, size);
	};


	// tasks functions
	function deleteTask(taskId) {
		setTasks([...tasks.filter(item => item.uuid !== taskId)])
	}

	function addTask(text) {
		setTasks([...tasks, {
			uuid: rangomStringId(32),
			done: false,
			name: text,
			createdAt: +new Date()
		}])
	}

	function editTask(taskId, text) {
		setTasks([...tasks.map(item => item.uuid === taskId ? { ...item, name: text } : item)])
	}

	function completeTask(taskId, complete) {
		setTasks([...tasks.map(item => item.uuid === taskId ? { ...item, done: complete } : item)])
	}


	// filter functions
	function showTasksWithOption(type) {
		setOptionsType(type)
	}

	function sortTasks(type) {
		setSortType(type)
	}

	function sortFilter(a, b, type) {
		if (type === 'reverseSort') {
			if (a > b)
				return 1
			return -1
		}
	}

	function optionsFilter(item, type) {
		switch (type) {
			case 'All':
				return true
			case 'Done':
				if (item.done)
					return true
				return false
			case 'Undone':
				if (!item.done)
					return true
				return false
		}
	}

	// pages

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
					<Pages
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
