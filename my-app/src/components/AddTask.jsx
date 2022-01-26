import { Input, message } from 'antd'
import { useState } from 'react';

function AddTask({ addTask }) {

    const [inputText, setInputText] = useState("")

    function onEnter(text) {
        const filteredText = text.trim()
        if (filteredText !== "") {
            setInputText("")
            addTask(text)
        } else {
            message.error('Task text must not be empty', 3)
        }
    }

    function OnEdit(e) {
        setInputText(e.target.value)
    }

    return (
        <Input.Search
            placeholder='I want to...'
            onSearch={onEnter}
            onChange={OnEdit}
            enterButton='Add'
            value={inputText}
        />
    );
}

export default AddTask;
