import arrow_up from '../images/icons/arrow_up.svg';
import arrow_down from '../images/icons/arrow_down.svg';
import OptionsButton from './OptionsButton';
import SortingButton from './SortingButton';

function Sorting(props) {
    return (
        <aside className="search-form">
            <div className="search-form-buttons">
                <OptionsButton text="Done" cback={props.showDoneTasks}/>
                <OptionsButton text="All" cback={props.showAllTasks}/>
                <OptionsButton text="Undone" cback={props.showUndoneTasks}/>
            </div>
            <div className="search-form-sort">
                <p className="search-form-sort__text">Sort by Date:</p>
                <SortingButton img={arrow_up} />
                <SortingButton img={arrow_down} />
            </div> 
        </aside>
    );
  }
  
  export default Sorting;
  