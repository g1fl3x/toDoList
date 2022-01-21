function SortingButton({ type, img, selected, sortTasks }) {
	let buttonStyles = "search-form-sort__button"
	if (selected)
		buttonStyles += " search-form-sort__button_selected"
	return (
		<button
			className={buttonStyles}
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