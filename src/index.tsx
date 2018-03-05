import * as React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import 'todomvc-app-css/index.css';

import { Provider } from 'react-redux';
import { TodoStore as todosFactory } from './models/todos';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';

const initialState = {
    todos: [
        {
            text: 'learn Redux',
            completed: false,
            id: 0,
        },
    ],
};
// TODO fix any
const todos = ((window as any).todos = (todosFactory as any).create(initialState));
const store = asReduxStore(todos);
connectReduxDevtools(require('remotedev'), todos);

// TODO fix any
render(
    <Provider store={store as any}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
