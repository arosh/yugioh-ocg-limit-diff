import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import App from './App';

function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(
  counter,
  composeWithDevTools(applyMiddleware(thunk)),
);

let Todo = ({ value, handleClick }) => (
  <div>
    <p>{value}</p>
    <button onClick={handleClick}>+1</button>
  </div>
);

Todo.propTypes = {
  value: React.PropTypes.number.isRequired,
  handleClick: React.PropTypes.func.isRequired,
};

function increment() {
  return dispatch => dispatch({ type: 'INCREMENT' });
}

function mapStateToProps(state) {
  return {
    value: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () => { dispatch(increment()); },
  };
}

Todo = connect(mapStateToProps, mapDispatchToProps)(Todo);

render(
  <Provider store={store}>
    <Todo />
  </Provider>,
  document.getElementById('react-root'),
);
