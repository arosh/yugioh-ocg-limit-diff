// @flow
import Dispatcher from './Dispatcher';
import ProviderService from '../services/ProviderService';

class UseCase {
  async updateRule(newRule: string, oldRule: string) {
    const index = await ProviderService.fetchIndex();
    const nameToUrl = {};
    for (const item of index) {
      nameToUrl[item.name] = item.url;
    }
    Dispatcher.dispatch({
      type: 'UPDATE_RULE',
      value: {
        newRule,
        newUrl: nameToUrl[newRule],
        oldRule,
        oldUrl: nameToUrl[oldRule],
      },
    });
  }
}

export default new UseCase();
