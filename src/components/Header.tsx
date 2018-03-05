import * as React from 'react';
import { TodoTextInput } from './TodoTextInput';

interface Props {
    addTodo: (text: string) => void;
}

export const Header: React.SFC<Props> = (props: Props) => {
    function handleSave(text: string) {
        if (text.length !== 0) {
            props.addTodo(text);
        }
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <TodoTextInput newTodo={true} onSave={handleSave} placeholder="What needs to be done?" />
        </header>
    );
};
