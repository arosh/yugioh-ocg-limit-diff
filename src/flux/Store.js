// @flow
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
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
  value: { newRule: string, newUrl: string, oldRule: string, oldUrl: string },
};

class Store extends ReduceStore<TPayload, TState> {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {
      newName: '',
      newUrl: '',
      oldName: '',
      oldUrl: '',
      zero: [],
      one: [],
      two: [],
      three: [],
    };
  }

  reduce(state: TState, action: TPayload) {
    switch (action.type) {
      case 'UPDATE_RULE':
        return Object.assign({}, state, {
          ...action.value,
        });
      default:
        return state;
    }
  }
}

export default new Store();
