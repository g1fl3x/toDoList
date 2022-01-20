function SortingButton({type, img, sortTasks}) {
  return (
    <button 
    	className="search-form-sort__button"
		onClick={() => sortTasks(type)}
	>
        <img 
			className="search-form-sort__image"
			src={img}
		/>
    </button>
);
}

export default SortingButton;