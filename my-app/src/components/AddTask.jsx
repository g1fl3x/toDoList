import { Input } from 'antd'
import { useState } from 'react';

function AddTask({ addTask }) {

    const [inputValue, setInputValue] = useState('')

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            const filteredInputText = inputValue.trim()
            if (filteredInputText !== '')
                addTask(filteredInputText);
            setInputValue('')
        }
    }

    return (
        <Input
            value={inputValue}
            placeholder='I want to...'
            onKeyDown={handleKeyDown}
        />
    );
}

export default AddTask;
