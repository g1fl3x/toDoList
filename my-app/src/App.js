import React, { useState } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";

function App() {
	const [tasks, changeTasks] = useState([
		{id: "sdfghsdfgfdsg", completed: true, text: "Text example", time: "2022/09/03"},
		{id: "sdfghsdfgdsfjkg", completed: false, text: "Create reactJs App", time: "2022/01/04"},
		{id: "isgfgsdfsd", completed: false, text: "Fix code", time: "2021/01/04"}
	])
	const [optionsType, setOptionsType] = useState('all')
	const [sortType, setSortType] = useState('standart')

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
		changeTasks([...tasks, {id: randomString(32), completed: false, text: text, time: +new Date()}])
	}

	function editTask(taskId, text) {
		changeTasks(tasks.map(task => task.id === taskId ? {...task, text: text} : task))
	}

	function completeTask(taskId, complete) {
		changeTasks(tasks.map(task => task.id === taskId ? {...task, completed: complete} : task))
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
				if (item.completed)
					return false
				return true	
		}
	}

	function sortTasks() {
		setSortType('standart')
	}

	function reverseSortTasks() {
		setSortType('reverse')
	}

	function sortFilter(a, b, type) {
		switch(type) {
			case 'classic':
				if (a < b)
					return 1
				return -1
			case 'reverse':
				if (a > b)
					return 1
				return -1
		}

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
				posts={tasks.filter(item => optionsFilter(item, optionsType)).sort((a, b) => sortFilter(a, b, sortType))}
				editTaskCallback={editTask}
				deleteTaskCallback={deleteTask}
				completeTaskCallback={completeTask}
			/>
		</main>
		<nav className="pages">

        </nav>
    </div>
  );
}

export default App;
