import { Input } from 'antd'
import { useState } from 'react';

function AddTask({addTask}) {

    const [inputValue, setInputValue] = useState('')

	function handleOnChange(e) {
		setInputValue(e.currentTarget.value)
	}

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            const filteredInputText = inputValue.trim()
            if (filteredInputText !== '')
                addTask(filteredInputText);
            setInputValue('')
        }
    }

    return (
        <div>
            <Input 
                value={inputValue}
                placeholder='I want to...' 
                onKeyDown={handleKeyDown}
                onChange={handleOnChange}
            />
        </div>
    );
  }
  
  export default AddTask;
  