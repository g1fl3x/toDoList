import arrow_up from '../images/icons/arrow_up.svg';
import arrow_down from '../images/icons/arrow_down.svg';
import OptionsButton from './OptionsButton';
import SortingButton from './SortingButton';

function Sorting({ showTasksWithOption, sortTasks }) {

    return (
        <aside className="search-form">
            <div className="search-form-buttons">
                {["All", "Done", "Undone"]
                    .map((el, i) => <OptionsButton key={i} text={el} showTasksWithOption={showTasksWithOption} />)}
            </div>
            <div className="search-form-sort">
                <p className="search-form-sort__text">Sort by Date:</p>
                <SortingButton type="classicSort" img={arrow_up} sortTasks={sortTasks} />
                <SortingButton type="reverseSort" img={arrow_down} sortTasks={sortTasks} />
            </div>
        </aside>
    );
}

export default Sorting;
