function Page(props) {
    return (
        <div className="pages__page">
            <button 
                className="pages__page-button pages__page-button_dark pages__page-button_selected"
                onClick={() => props.changePage(props.pageNumber)}
            >
                {props.pageNumber}
            </button>
        </div>
    );
}

export default Page;