// @flow
import store from './Store';
import ProviderService from '../services/ProviderService';
import DiffService from '../services/DiffService';

class UseCase {
  // ここで nameToUrl を計算せずに Rule のほうで計算するという方法を使いたくなるが，
  // Rule のほうに非同期処理を書ける適切な場所がないので仕方なくここに書いている
  async updateRule(newName: string, oldName: string) {
    const index = await ProviderService.fetchIndex();
    const nameToUrl = {};
    for (const item of index) {
      nameToUrl[item.name] = item.url;
    }
    const { zero, one, two, three } = await DiffService.computeDiff(
      oldName,
      newName
    );
    store.dispatch({
      type: 'UPDATE_RULE',
      value: {
        newName,
        newUrl: nameToUrl[newName],
        oldName,
        oldUrl: nameToUrl[oldName],
        zero,
        one,
        two,
        three,
      },
    });
  }
}

export default new UseCase();
