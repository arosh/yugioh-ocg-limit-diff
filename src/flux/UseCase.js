// @flow
import store from './Store';
import ProviderService from '../services/ProviderService';
import DiffService from '../services/DiffService';

// ここで nameToUrl を計算せずに Rule のほうで計算するという方法を使いたくなるが，
// Rule のほうに非同期処理を書ける適切な場所がないので仕方なくここに書いている
export async function updateRule(newName: string, oldName: string) {
  console.log(newName, oldName);
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
    type: 'UPDATE',
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

export async function initialize() {
  const items = await ProviderService.fetchIndex();
  items.reverse();
  store.dispatch({
    type: 'UPDATE',
    value: {
      selectOptions: items,
    },
  });
  updateRule(items[0].name, items[1].name);
}
