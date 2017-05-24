// @flow
import Dispatcher from './Dispatcher';

class UpdateRuleUseCase {
  updateRule(newRule: string, oldRule: string) {
    Dispatcher.dispatch({
      key: 'UPDATE_RULE',
      value: {
        newRule,
        oldRule,
      },
    });
  }
}

export default new UpdateRuleUseCase();
