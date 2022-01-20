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
	const [optionsType, setOptionsType] = useState('all')
	const [sortType, setSortType] = useState('classic')
	const [page, setPage] = useState(1)
	const tasksOnPage = 10

	function randomString(i) {
		let rnd = '';
		while (rnd.length < i)
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, i);
	};

	function deleteTask(taskId) {
		changeTasks(tasks.filter(task => task.id !== taskId))
	}

	function addTask(text) {
		changeTasks([...tasks, {
			id: randomString(32),
			completed: false,
			text: text,
			time: +new Date()
		}])
	}

	function editTask(taskId, text) {
		changeTasks(tasks.map(task => task.id === taskId ? { ...task, text: text } : task))
	}

	function completeTask(taskId, complete) {
		changeTasks(tasks.map(task => task.id === taskId ? { ...task, completed: complete } : task))
	}

	function showAllTasks() {
		setOptionsType('all')
	}

	function showDoneTasks() {
		setOptionsType('done')
	}

	function showUndoneTasks() {
		setOptionsType('undone')
	}

	function optionsFilter(item, type) {
		switch (type) {
			case 'all':
				return true
			case 'done':
				if (item.completed)
					return true
				return false
			case 'undone':
				if (!item.completed)
					return true
				return false
		}
	}

	function sortTasks() {
		setSortType('classic')
	}

	function reverseSortTasks() {
		setSortType('reverse')
	}

	function sortFilter(a, b, type) {
		switch (type) {
			case 'default':
				if (a < b)
					return 1
				return -1
			case 'reverse':
				if (a > b)
					return 1
				return -1
		}
	}

	function changePage(pageNumber) {
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
			<AddTask addTaskCallback={addTask} />
			<Sorting
				showAllTasks={showAllTasks}
				showDoneTasks={showDoneTasks}
				showUndoneTasks={showUndoneTasks}
				sortTasks={sortTasks}
				reverseSortTasks={reverseSortTasks}
			/>
			<main className="main">
				<TasksList
					posts={tasks.filter(item => optionsFilter(item, optionsType))
						.sort((a, b) => sortFilter(a, b, sortType))
						.slice((page - 1) * tasksOnPage, page * tasksOnPage)}
					editTaskCallback={editTask}
					deleteTaskCallback={deleteTask}
					completeTaskCallback={completeTask}
				/>
			</main>
			<nav className="pages">
				<div className="pages__block pages__block_dark">
					<Pages
						pageCount={getPagesCount()}
						changePage={changePage}
					/>
				</div>
			</nav>
		</div>
	);
}

export default App;
