// @flow
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';

type TState = {
  newRule: string,
  newUrl: string,
  oldRule: string,
  oldUrl: string,
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
      newRule: '',
      newUrl: '',
      oldRule: '',
      oldUrl: '',
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
