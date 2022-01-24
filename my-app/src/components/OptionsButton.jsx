function OptionsButton({ text, selected, showTasksWithOption }) {
    let buttonStyles = "search-form-buttons__button search-form-buttons__button_dark"
    if (selected)
        buttonStyles += " search-form-buttons__button_selected"
    return (
        <button
            className={buttonStyles}
            onClick={() => showTasksWithOption(text.toLowerCase())}
        >
            {text}
        </button>
    );
}

export default OptionsButton;