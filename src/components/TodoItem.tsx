import * as React from 'react';
import * as classnames from 'classnames';
import { TodoTextInput } from './TodoTextInput';
import { ITodo } from 'src/models/todos';

interface Props {
    todo: ITodo;
    editTodo: (id: number, text: string) => void;
    deleteTodo: (id: number) => void;
    completeTodo: (id: number) => void;
}

export class TodoItem extends React.Component<Props> {
    state = {
        editing: false,
    };

    handleDoubleClick = () => {
        this.setState({ editing: true });
    };

    handleSave(id: number, text: string) {
        if (text.length === 0) {
            this.props.deleteTodo(id);
        } else {
            this.props.editTodo(id, text);
        }
        this.setState({ editing: false });
    }

    render() {
        const { todo, completeTodo, deleteTodo } = this.props;

        const _handleSave = (text: string) => this.handleSave(todo.id, text);
        const _completeTodo = () => completeTodo(todo.id);
        const _deleteTodo = () => deleteTodo(todo.id);

        return (
            <li
                className={classnames({
                    completed: todo.completed,
                    editing: this.state.editing,
                })}
            >
                {this.state.editing ? (
                    <TodoTextInput text={todo.text} editing={this.state.editing} onSave={_handleSave} />
                ) : (
                    <div className="view">
                        <input className="toggle" type="checkbox" checked={todo.completed} onChange={_completeTodo} />
                        <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
                        <button className="destroy" onClick={_deleteTodo} />
                    </div>
                )}
            </li>
        );
    }
}
