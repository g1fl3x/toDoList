import { Input } from 'antd'
import { useState } from 'react';

function AddTask({ addTask }) {

    const [inputText, setInputText] = useState("")

    function onEnter(text) {
        setInputText("")
        addTask(text)
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
