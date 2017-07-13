// @flow
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import type { Card } from '../services/DiffService';

type TState = {
  newName: string,
  newUrl: string,
  oldName: string,
  oldUrl: string,
  zero: Card[],
  one: Card[],
  two: Card[],
  three: Card[],
};

type TPayload = {
  type: string,
  value: {
    newRule: string,
    newUrl: string,
    oldRule: string,
    oldUrl: string,
    zero: Card[],
    one: Card[],
    two: Card[],
    three: Card[],
  },
};

const initialState: TState = {
  newName: '',
  newUrl: '',
  oldName: '',
  oldUrl: '',
  zero: [],
  one: [],
  two: [],
  three: [],
};

function reduce(state: TState = initialState, action: TPayload) {
  switch (action.type) {
    case 'UPDATE_RULE':
      return Object.assign({}, state, {
        ...action.value,
      });
    default:
      return state;
  }
}

export default createStore(reduce, composeWithDevTools());
