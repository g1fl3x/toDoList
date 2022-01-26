import { Input } from 'antd'
import { useState } from 'react';

function AddTask({ addTask }) {

    const [inputText, setInputText] = useState("")

    function onEnter(text) {
        setInputText("")
        addTask(text)
    }

    function handlerOnEdit(e) {
        setInputText(e.target.value)
    }

    return (
        <Input.Search
            placeholder='I want to...'
            onSearch={onEnter}
            onChange={handlerOnEdit}
            enterButton='Add'
            value={inputText}
        />
    );
}

export default AddTask;
