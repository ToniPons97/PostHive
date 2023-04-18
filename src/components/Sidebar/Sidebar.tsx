import './Sidebar.scss';
import { faMagnifyingGlass, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SidebarProps = {
    onPinFilter: (ev: {
        target: {
            checked: boolean;
        };
    }) => void,
    onKeywordSearch: (ev: {
        target: {
            value: string;
        };
    }) => void
}

const Sidebar = ({ onPinFilter, onKeywordSearch }: SidebarProps) => {
    return (
        <section className='sidebar'>
            <div className='filter-tool'>
                <div className="keyword-filter">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        id='keyword-seach'
                        type='text'
                        placeholder='enter keyword'
                        onChange={onKeywordSearch}
                    />
                </div>
                <div className='pin-filter'>
                    <FontAwesomeIcon icon={faThumbTack} />
                    <label htmlFor="pin-checkbox">Show pinned</label>
                    <input onChange={onPinFilter} type="checkbox" name="" id="pin-checkbox" />
                </div>

            </div>
        </section>
    );
}

export default Sidebar;