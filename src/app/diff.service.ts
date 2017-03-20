import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { Compare } from 'app/compare';
import { BackendService } from 'app/backend.service';
import { Card } from 'app/card';
import * as _ from 'lodash';

@Injectable()
export class DiffService {
  compare: Compare;
  update = new Subject<void>();
  zero: Card[];
  one: Card[];
  two: Card[];
  three: Card[];

  constructor(private backendService: BackendService) { }

  updateCompare(compare: Compare) {
    this.compare = compare;
    this.computeDiff().then(() => {
      this.update.next();
    });
  }

  computeDiff(): Promise<void> {
    const oldName = this.compare.oldRule.name;
    const newName = this.compare.newRule.name;
    const oldLimitPromise = this.backendService.getRule(oldName);
    const newLimitPromise = this.backendService.getRule(newName);
    return Promise
      .all([oldLimitPromise, newLimitPromise])
      .then(([oldLimit, newLimit]) => {
        const oldLimitAll: string[] = [];
        oldLimitAll.push(...oldLimit.zero);
        oldLimitAll.push(...oldLimit.one);
        oldLimitAll.push(...oldLimit.two);

        const newLimitAll: string[] = [];
        newLimitAll.push(...newLimit.zero);
        newLimitAll.push(...newLimit.one);
        newLimitAll.push(...newLimit.two);

        this.zero = [];
        for (const name of _.intersection(oldLimit.one, newLimit.zero)) {
          this.zero.push({ name, prevStatus: 'one', nextStatus: 'zero' });
        }
        for (const name of _.intersection(oldLimit.two, newLimit.zero)) {
          this.zero.push({ name, prevStatus: 'two', nextStatus: 'zero' });
        }
        for (const name of _.difference(newLimit.zero, oldLimitAll)) {
          this.zero.push({ name, prevStatus: 'three', nextStatus: 'zero' });
        }
        for (const name of _.intersection(oldLimit.zero, newLimit.zero)) {
          this.zero.push({ name, prevStatus: 'zero', nextStatus: 'zero' });
        }

        this.one = [];
        for (const name of _.intersection(oldLimit.zero, newLimit.one)) {
          this.one.push({ name, prevStatus: 'zero', nextStatus: 'one' });
        }
        for (const name of _.intersection(oldLimit.two, newLimit.one)) {
          this.one.push({ name, prevStatus: 'two', nextStatus: 'one' });
        }
        for (const name of _.difference(newLimit.one, oldLimitAll)) {
          this.one.push({ name, prevStatus: 'three', nextStatus: 'one' });
        }
        for (const name of _.intersection(oldLimit.one, newLimit.one)) {
          this.one.push({ name, prevStatus: 'one', nextStatus: 'one' });
        }

        this.two = [];
        for (const name of _.intersection(oldLimit.zero, newLimit.two)) {
          this.two.push({ name, prevStatus: 'zero', nextStatus: 'two' });
        }
        for (const name of _.intersection(oldLimit.one, newLimit.two)) {
          this.two.push({ name, prevStatus: 'one', nextStatus: 'two' });
        }
        for (const name of _.difference(newLimit.two, oldLimitAll)) {
          this.two.push({ name, prevStatus: 'three', nextStatus: 'two' });
        }
        for (const name of _.intersection(oldLimit.two, newLimit.two)) {
          this.two.push({ name, prevStatus: 'two', nextStatus: 'two' });
        }

        this.three = [];
        for (const name of _.difference(oldLimit.zero, newLimitAll)) {
          this.three.push({ name, prevStatus: 'zero', nextStatus: 'three' });
        }
        for (const name of _.difference(oldLimit.one, newLimitAll)) {
          this.three.push({ name, prevStatus: 'one', nextStatus: 'three' });
        }
        for (const name of _.difference(oldLimit.two, newLimitAll)) {
          this.three.push({ name, prevStatus: 'two', nextStatus: 'three' });
        }
      });
  }
}
