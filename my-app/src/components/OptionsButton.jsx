function OptionsButton(props) {
    return (
        <button 
            className="search-form-buttons__button search-form-buttons__button_dark"
            onClick={() => props.cback()}
        >
        {props.text}
        </button>
    );
  }

  export default OptionsButton;