// @flow
import ProviderService from './ProviderService';
import * as _ from 'lodash';

export type Card = {
  name: string,
  prevStatus: string,
  nextStatus: string,
};

class DiffService {
  async computeDiff(oldName: string, newName: string) {
    // 並行にダウンロードする
    const oldLimitPromise = ProviderService.fetchRule(oldName);
    const newLimitPromise = ProviderService.fetchRule(newName);
    const oldLimit = await oldLimitPromise;
    const newLimit = await newLimitPromise;
    const oldLimitAll: string[] = [];
    oldLimitAll.push(...oldLimit.zero);
    oldLimitAll.push(...oldLimit.one);
    oldLimitAll.push(...oldLimit.two);

    const newLimitAll: string[] = [];
    newLimitAll.push(...newLimit.zero);
    newLimitAll.push(...newLimit.one);
    newLimitAll.push(...newLimit.two);

    const zero: Card[] = [];
    for (const name of _.intersection(oldLimit.one, newLimit.zero)) {
      zero.push({ name, prevStatus: 'one', nextStatus: 'zero' });
    }
    for (const name of _.intersection(oldLimit.two, newLimit.zero)) {
      zero.push({ name, prevStatus: 'two', nextStatus: 'zero' });
    }
    for (const name of _.difference(newLimit.zero, oldLimitAll)) {
      zero.push({ name, prevStatus: 'three', nextStatus: 'zero' });
    }
    for (const name of _.intersection(oldLimit.zero, newLimit.zero)) {
      zero.push({ name, prevStatus: 'zero', nextStatus: 'zero' });
    }

    const one: Card[] = [];
    for (const name of _.intersection(oldLimit.zero, newLimit.one)) {
      one.push({ name, prevStatus: 'zero', nextStatus: 'one' });
    }
    for (const name of _.intersection(oldLimit.two, newLimit.one)) {
      one.push({ name, prevStatus: 'two', nextStatus: 'one' });
    }
    for (const name of _.difference(newLimit.one, oldLimitAll)) {
      one.push({ name, prevStatus: 'three', nextStatus: 'one' });
    }
    for (const name of _.intersection(oldLimit.one, newLimit.one)) {
      one.push({ name, prevStatus: 'one', nextStatus: 'one' });
    }

    const two: Card[] = [];
    for (const name of _.intersection(oldLimit.zero, newLimit.two)) {
      two.push({ name, prevStatus: 'zero', nextStatus: 'two' });
    }
    for (const name of _.intersection(oldLimit.one, newLimit.two)) {
      two.push({ name, prevStatus: 'one', nextStatus: 'two' });
    }
    for (const name of _.difference(newLimit.two, oldLimitAll)) {
      two.push({ name, prevStatus: 'three', nextStatus: 'two' });
    }
    for (const name of _.intersection(oldLimit.two, newLimit.two)) {
      two.push({ name, prevStatus: 'two', nextStatus: 'two' });
    }

    const three: Card[] = [];
    for (const name of _.difference(oldLimit.zero, newLimitAll)) {
      three.push({ name, prevStatus: 'zero', nextStatus: 'three' });
    }
    for (const name of _.difference(oldLimit.one, newLimitAll)) {
      three.push({ name, prevStatus: 'one', nextStatus: 'three' });
    }
    for (const name of _.difference(oldLimit.two, newLimitAll)) {
      three.push({ name, prevStatus: 'two', nextStatus: 'three' });
    }

    return { zero, one, two, three };
  }
}

export default new DiffService();
