import * as React from 'react';
import * as PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header } from '../components/Header';
import { MainSection } from '../components/MainSection';
import * as TodoActions from '../actions';

// TODO fix any
const App = ({ todos, actions }: { todos: any; actions: any }) => (
    <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
    </div>
);

// TODO fix any
(App as any).propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

// TODO fix any
const mapStateToProps = (state: any) => ({
    todos: state.todos,
});

// TODO fix any
const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(TodoActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
