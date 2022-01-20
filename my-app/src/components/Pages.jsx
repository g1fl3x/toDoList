import Page from './Page'

function Pages({ setCurrentPage, pagesCount }) {
    return (
        [...Array(pagesCount)]
            .map((_, index) => <Page pageNumber={index + 1} key={index + 1} setCurrentPage={setCurrentPage} />)
    );
}

export default Pages;