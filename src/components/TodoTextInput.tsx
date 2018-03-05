import * as React from 'react';
import * as classnames from 'classnames';

interface Props {
    onSave: any; // TODO: fix
    text?: string;
    placeholder?: string;
    editing?: boolean;
    newTodo?: boolean;
}
export class TodoTextInput extends React.Component<Props> {
    state = {
        text: this.props.text || '',
    };

    // TODO: fix any
    handleSubmit = (e: any) => {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo) {
                this.setState({ text: '' });
            }
        }
    };

    // TODO: fix any
    handleChange = (e: any) => {
        this.setState({ text: e.target.value });
    };

    // TODO: fix any
    handleBlur = (e: any) => {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    };

    render() {
        return (
            <input
                className={classnames({
                    edit: this.props.editing,
                    'new-todo': this.props.newTodo,
                })}
                type="text"
                placeholder={this.props.placeholder}
                autoFocus={true}
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
            />
        );
    }
}
