import Page from './Page'

function Pages(props) {
    return (
        [...Array(props.pageCount)]
        .map((_, index) => <Page pageNumber={index+1} key={index+1} changePage={props.changePage}/>)
    );
}

export default Pages;