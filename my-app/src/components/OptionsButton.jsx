function OptionsButton({text, showTasksWithOption}) {
    return (
        <button 
            className="search-form-buttons__button search-form-buttons__button_dark"
            onClick={() => showTasksWithOption(text)}
        >
        {text}
        </button>
    );
  }

  export default OptionsButton;