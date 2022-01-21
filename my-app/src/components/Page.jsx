function Page({ changeCurrentPage, selected, pageNumber }) {
    let buttonStyles = "pages__page-button pages__page-button_dark";
    if (selected) {
        buttonStyles += " pages__page-button_selected"
    }
    return (
        <div className="pages__page">
            <button
                className={buttonStyles}
                onClick={() => changeCurrentPage(pageNumber)}
            >
                {pageNumber}
            </button>
        </div>
    );
}

export default Page;