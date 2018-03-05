import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    COMPLETE_TODO,
    COMPLETE_ALL,
    CLEAR_COMPLETED,
} from '../constants/ActionTypes';
import { types } from 'mobx-state-tree';

const Todo = types.model({
    text: 'Learn Redux',
    completed: false,
    id: 0,
});
export type ITodo = typeof Todo.Type;

export const TodoStore = types
    .model({
        todos: types.optional(types.array(Todo), <ITodo[]>[]),
    })
    .views(self => ({
        findTodoById: function(id: number) {
            return self.todos.find((todo: ITodo) => todo.id === id);
        },
    }))
    .actions(self => ({
        [ADD_TODO]({ text }: { text: string }) {
            const id = self.todos.reduce((maxId: number, todo: ITodo) => Math.max(todo.id, maxId), -1) + 1;
            self.todos.unshift({
                id,
                text,
                completed: false,
            });
        },
        [DELETE_TODO]({ id }: { id: number }) {
            const todo = self.findTodoById(id);
            !!todo && self.todos.remove(todo);
        },
        [EDIT_TODO]({ id, text }: { id: number; text: string }) {
            const todo = self.findTodoById(id);
            !!todo && (todo.text = text);
        },
        [COMPLETE_TODO]({ id }: { id: number }) {
            const todo = self.findTodoById(id);
            !!todo && (todo.completed = !todo.completed);
        },
        [COMPLETE_ALL]() {
            const areAllMarked = self.todos.every((todo: ITodo) => todo.completed);
            self.todos.forEach(todo => (todo.completed = !areAllMarked));
        },
        [CLEAR_COMPLETED]() {
            self.todos.replace(self.todos.filter((todo: ITodo) => todo.completed === false));
        },
    }));
