function AddTask({addTask}) {

    function handleKeyDown(event) {

        if (event.keyCode === 13) {
            const filteredInputText = event.currentTarget.value.trim()
            if (filteredInputText !== "")
                addTask(filteredInputText);
            event.currentTarget.value = ""
        }
    }

    return (
        <div className="add-form add-form_dark">
            <input 
                className="add-form__input add-form__input_dark" 
                placeholder="I want to..." 
                onKeyDown={handleKeyDown}
            />
        </div>
    );
  }
  
  export default AddTask;
  