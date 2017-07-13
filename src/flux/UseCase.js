// @flow
import * as qs from 'qs';
import store from './Store';
import ProviderService, { ignoreSlash } from '../services/ProviderService';
import DiffService from '../services/DiffService';

async function canonicalNameInverse(name: string) {
  const index = await ProviderService.fetchIndex();
  for (const item of index) {
    if (ignoreSlash(item.name) === name) {
      return item.name;
    }
  }
  return '';
}

function replaceUrl(newName: string, oldName: string) {
  newName = ignoreSlash(newName);
  oldName = ignoreSlash(oldName);
  window.history.replaceState(null, null, '?' + qs.stringify({new: newName, old: oldName}));
}

// ここで nameToUrl を計算せずに Rule のほうで計算するという方法を使いたくなるが，
// Rule のほうに非同期処理を書ける適切な場所がないので仕方なくここに書いている
export async function updateRule(newName: string, oldName: string) {
  replaceUrl(newName, oldName);
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

export async function initialize(newName: string, oldName: string) {
  const items = await ProviderService.fetchIndex();
  items.reverse();
  store.dispatch({
    type: 'UPDATE',
    value: {
      selectOptions: items,
    },
  });
  if (!newName) {
    newName = items[0].name;
  } else {
    newName = await canonicalNameInverse(newName);
  }
  if (!oldName) {
    oldName = items[1].name;
  } else {
    oldName = await canonicalNameInverse(oldName);
  }
  updateRule(newName, oldName);
}
