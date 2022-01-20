import React, { useState } from "react";
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
	const [optionsType, setOptionsType] = useState('All')
	const [sortType, setSortType] = useState('classicSort')
	const [page, setPage] = useState(1)

	const tasksOnPage = 10


	// utils
	function rangomStringId(size) {
		let rnd = '';
		while (rnd.length < size)
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, size);
	};


	// tasks functions
	function deleteTask(taskId) {
		changeTasks(tasks.filter(item => item.id !== taskId))
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
		changeTasks(tasks.map(item => item.id === taskId ? { ...item, text: text } : item))
	}

	function completeTask(taskId, complete) {
		changeTasks(tasks.map(item => item.id === taskId ? { ...item, completed: complete } : item))
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
		setPage(pageNumber)
	}

	function getPagesCount() {
		const tasksList = tasks.filter(item => optionsFilter(item, optionsType))
		const pagesFloat = tasksList.length / tasksOnPage
		let pagesCount = Number.isInteger(pagesFloat) ? Math.floor(pagesFloat) : Math.floor(pagesFloat) + 1
		if (pagesCount < 1) {
			pagesCount = 1
		}
		if (pagesCount < page) {
			setPage(pagesCount)
		}
		return pagesCount
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
					posts={tasks.filter(item => optionsFilter(item, optionsType))
						.sort((a, b) => sortFilter(a, b, sortType))
						.slice((page - 1) * tasksOnPage, page * tasksOnPage)}
					editTask={editTask}
					deleteTask={deleteTask}
					completeTask={completeTask}
				/>
			</main>

			<nav className="pages">
				<div className="pages__block pages__block_dark">
					<Pages
						pagesCount={getPagesCount()}
						setCurrentPage={setCurrentPage}
					/>
				</div>
			</nav>
		</div>
	);
}

export default App;
