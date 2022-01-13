import React, { useState } from "react";
import AddTask from "./components/AddTask";
import Sorting from "./components/Sorting";
import TasksList from "./components/TasksList";

function App() {

	function randomString(i) {
		var rnd = '';
		while (rnd.length < i) 
			rnd += Math.random().toString(36).substring(2);
		return rnd.substring(0, i);
	};

	const [tasks, changePosts] = useState([
		{id: "sdfghsdfgfdsg", completed: false, text: "Text example", time: "2022/09/03"},
		{id: "sdfghsdfgdsfjkg", completed: false, text: "Create reactJs App", time: "2022/01/04"},
		{id: "isgfgsdfsd", completed: false, text: "Fix code", time: "2021/01/04"}
	])

	function deleteTask(taskId) {
		changePosts(tasks.filter(task => task.id !== taskId))
	}

	function addTask(text) {
		changePosts([...tasks, {id: randomString(32), completed: false, text: text, time: new Date().toISOString().slice(0, 10).replaceAll("-","/")}])
	}

	function editTask(taskId, text) {
		changePosts(tasks.map(task => task.id === taskId ? {...task, text: text} : task))
	}

  return (
    <div className="centered centered_styles">
		<header className="header">
			<h1>ToDo</h1>
		</header>
		<AddTask addTaskCallback={addTask} />
		<Sorting />
		<main className="main">
			<TasksList posts={tasks} editTaskCallback={editTask} deleteTaskCallback={deleteTask} />
		</main>
		<nav className="pages">

        </nav>
    </div>
  );
}

export default App;
