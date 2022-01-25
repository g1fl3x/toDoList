import { Button } from 'antd';

function Page({ changeCurrentPage, selected, pageNumber }) {
    return (
        <div className="pages__page">
            <Button
                type={selected ? 'primary': ''}
                onClick={() => changeCurrentPage(pageNumber)}
            >
                {pageNumber}
            </Button>
        </div>
    );
}

export default Page;