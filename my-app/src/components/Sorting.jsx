import arrow_up from '../images/icons/arrow_up.svg';
import arrow_down from '../images/icons/arrow_down.svg';
import OptionsButton from './OptionsButton';
import SortingButton from './SortingButton';

function Sorting({ showTasksWithOption, sortTasks, optionsType, sortType }) {
    return (
        <aside className="search-form">
            <div className="search-form-buttons">
                {["All", "Done", "Undone"]
                    .map((el, i) =>
                        <OptionsButton
                            key={i}
                            text={el}
                            selected={el.toLowerCase() === optionsType ? true : false}
                            showTasksWithOption={showTasksWithOption}
                        />)}
            </div>
            <div className="search-form-sort">
                <p className="search-form-sort__text">Sort by Date:</p>
                {[{ type: "asc", img: arrow_up },
                { type: "desc", img: arrow_down }]
                    .map((el, i) =>
                        <SortingButton
                            key={i}
                            type={el.type}
                            img={el.img}
                            selected={el.type === sortType ? true : false}
                            sortTasks={sortTasks}
                        />)}
            </div>
        </aside>
    );
}

export default Sorting;
