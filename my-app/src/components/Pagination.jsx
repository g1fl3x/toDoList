import Page from './Page'

function Pagination({ changeCurrentPage, pagesCount, currentPage }) {
    return (
        [...Array(pagesCount)]
            .map((_, index) =>
                <Page
                    pageNumber={index + 1}
                    key={index}
                    selected={currentPage === index + 1 ? true : false}
                    changeCurrentPage={changeCurrentPage}
                />)
    );
}

export default Pagination;