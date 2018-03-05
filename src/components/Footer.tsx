import * as classnames from 'classnames';
// TODO: remove prop-types and also from packages.json ???
import * as React from 'react';
import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants/TodoFilters';

const FILTER_TITLES = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed',
};

interface ITodoFooterProps {
    completedCount: number;
    activeCount: number;
    filter: string;
    onClearCompleted: () => void;
    onShow: (filter: string) => void;
}

export const Footer: React.SFC<ITodoFooterProps> = (props: ITodoFooterProps) => {
    function renderTodoCount() {
        const { activeCount } = props;
        const itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className="todo-count">
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        );
    }

    function renderFilterLink(filter: string) {
        const title = FILTER_TITLES[filter];
        const { filter: selectedFilter, onShow } = props;
        const xonShow = () => onShow(filter);

        return (
            <a
                className={classnames({ selected: filter === selectedFilter })}
                style={{ cursor: 'pointer' }}
                onClick={xonShow}
            >
                {title}
            </a>
        );
    }

    function renderClearButton() {
        const { completedCount, onClearCompleted } = props;
        return completedCount > 0 ? (
            <button className="clear-completed" onClick={onClearCompleted}>
                Clear completed
            </button>
        ) : (
            undefined
        );
    }

    return (
        <footer className="footer">
            {renderTodoCount()}
            <ul className="filters">
                {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter => (
                    <li key={filter}>{renderFilterLink(filter)}</li>
                ))}
            </ul>
            {renderClearButton()}
        </footer>
    );
};
