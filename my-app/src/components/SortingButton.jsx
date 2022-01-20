function SortingButton(props) {
  return (
    <button 
      	className="search-form-sort__button"
		onClick={props.cback}
		>
        <img className="search-form-sort__image" src={props.img} />
    </button>
);
}

export default SortingButton;