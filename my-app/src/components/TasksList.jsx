import Task from './Task.jsx'

function TasksList({ posts, editTask, deleteTask, completeTask }) {

    return (
        posts.map(post => <Task
            post={post}
            key={post.id}
            editTask={editTask}
            deleteTask={deleteTask}
            completeTask={completeTask}
        />)
    );
}

export default TasksList;