function AddTask(props) {

    function handleKeyDown(event) {

        if (event.keyCode === 13) {
            props.addTaskCallback(event.currentTarget.value);
        }
    }

    return (
        <div className="add-form add-form_dark">
            <input className="add-form__input add-form__input_dark" placeholder="I want to..." onKeyDown={handleKeyDown} />
        </div>
    );
  }
  
  export default AddTask;
  