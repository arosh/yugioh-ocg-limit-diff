// @flow
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import type { Card } from '../services/DiffService';
import type { IndexItem } from '../services/ProviderService';

type TState = {
  newName: string,
  newUrl: string,
  oldName: string,
  oldUrl: string,
  selectOptions: IndexItem[],
  zero: Card[],
  one: Card[],
  two: Card[],
  three: Card[],
};

type TPayload = {
  type: string,
  value: TState,
};

const initialState: TState = {
  newName: '',
  newUrl: '',
  oldName: '',
  oldUrl: '',
  selectOptions: [],
  zero: [],
  one: [],
  two: [],
  three: [],
};

function reduce(state: TState = initialState, action: TPayload) {
  switch (action.type) {
    case 'UPDATE':
      return Object.assign({}, state, {
        ...action.value,
      });
    default:
      return state;
  }
}

export default createStore(reduce, composeWithDevTools());
