import { Button } from 'antd';

function OptionsButton({ text, selected, showTasksWithOption }) {
    return (
        <Button
            type={selected ? 'primary' : ''}
            style={{ marginRight: 5 }}
            onClick={() => showTasksWithOption(text.toLowerCase())}
        >
            {text}
        </Button>
    );
}

export default OptionsButton;