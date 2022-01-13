import Task from './Task.jsx'

function TasksList(props) {

    return (
        props.posts.map(post => <Task post={post} key={post.id} editTaskCallback={props.editTaskCallback} deleteTaskCallback={props.deleteTaskCallback} />)
    );
  }
  
  export default TasksList;