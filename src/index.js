import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import App from './App';
import CardListPanel from './CardListPanel';

/* function counter(state = 0, action) {
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

Todo = connect(mapStateToProps, mapDispatchToProps)(Todo);*/

function reducer(state, action) {
  return state;
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

const cardItems = [
  {
    hasLabel: true,
    labelLevel: 'success',
    labelText: '制限 > 準制限',
    cardName: '聖なる魔術師',
  },
];

render(
  <Provider store={store}>
    <CardListPanel panelHeading="準制限カード" panelLevel="info" cardItems={cardItems} />
  </Provider>,
  document.getElementById('react-root'),
);
