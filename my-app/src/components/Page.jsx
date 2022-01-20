function Page({ setCurrentPage, pageNumber }) {
    return (
        <div className="pages__page">
            <button
                className="pages__page-button pages__page-button_dark pages__page-button_selected"
                onClick={() => setCurrentPage(pageNumber)}
            >
                {pageNumber}
            </button>
        </div>
    );
}

export default Page;