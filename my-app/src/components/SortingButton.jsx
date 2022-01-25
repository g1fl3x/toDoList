import { Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

function SortingButton({ type, selected, sortTasks }) {
	return (
		<Button
			type={selected ? 'primary': ''}
			icon={type === 'asc'? <ArrowUpOutlined />: <ArrowDownOutlined />}
			onClick={() => sortTasks(type)}
		>
		</Button>
	);
}

export default SortingButton;