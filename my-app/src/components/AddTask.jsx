import { Input } from 'antd'

function AddTask({ addTask }) {

    function onEnter(text) {
        addTask(text)
    }

    return (
        <Input.Search
            placeholder='I want to...'
            onSearch={onEnter}
            allowClear
            enterButton='Add'
        />
    );
}

export default AddTask;
