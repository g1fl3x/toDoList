import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";
import Pages from "./components/Pages";

function App() {
	const [tasks, changeTasks] = useState([
		{ id: "sdfghsdfgfdsg", completed: true, text: "Text example", time: 1642676319020 },
		{ id: "sdfghsdfgdsfjkg", completed: false, text: "Create reactJs App", time: 1642676319056 },
		{ id: "isgfgsdfsd", completed: false, text: "Fix code", time: 1642676319017 }
	])
	const [currentTasks, changeCurrentTasks] = useState(tasks)
	const [pagesCount, setPagesCount] = useState(1)
	const [optionsType, setOptionsType] = useState('All')
	const [sortType, setSortType] = useState('classicSort')
	const [currentPage, changeCurrentPage] = useState(1)

	const tasksOnPage = 10

	useEffect(() => {

		const filteredTasks = tasks.filter(item => optionsFilter(item, optionsType))
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
			changeCurrentPage(pagesCount)
		}

		setPagesCount(pagesCount)
		changeCurrentTasks(outputTasks)

	}, [tasks, currentPage, sortType, optionsType])


	// utils
	function rangomStringId(size) {
		let rnd = '';
		while (rnd.length < size)
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, size);
	};


	// tasks functions
	function deleteTask(taskId) {
		changeTasks([...tasks.filter(item => item.id !== taskId)])
	}

	function addTask(text) {
		changeTasks([...tasks, {
			id: rangomStringId(32),
			completed: false,
			text: text,
			time: +new Date()
		}])
	}

	function editTask(taskId, text) {
		changeTasks([...tasks.map(item => item.id === taskId ? { ...item, text: text } : item)])
	}

	function completeTask(taskId, complete) {
		changeTasks([...tasks.map(item => item.id === taskId ? { ...item, completed: complete } : item)])
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
				if (item.completed)
					return true
				return false
			case 'Undone':
				if (!item.completed)
					return true
				return false
		}
	}

	// pages

	function setCurrentPage(pageNumber) {
		changeCurrentPage(pageNumber)
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
						setCurrentPage={setCurrentPage}
					/>
				</div>
			</nav>
		</div>
	);
}

export default App;
