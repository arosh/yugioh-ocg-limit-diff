import { Component, OnInit, Input } from '@angular/core';
import { Compare } from 'app/compare';
import { Card } from 'app/card';
import { RuleListService } from 'app/rule-list.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {
  @Input() panelType: string;
  @Input() compare: Compare;

  constructor(private ruleListService: RuleListService) { }

  get heading(): string {
    switch (this.panelType) {
      case 'zero':
        return '禁止カード';
      case 'one':
        return '制限カード';
      case 'two':
        return '準制限カード';
      case 'three':
        return '制限解除';
    }
  }

  get panelClass(): string {
    switch (this.panelType) {
      case 'zero':
        return 'panel panel-danger';
      case 'one':
        return 'panel panel-warning';
      case 'two':
        return 'panel panel-info';
      case 'three':
        return 'panel panel-success';
    }
  }

  get cardItems(): Card[] {
    const oldName = this.compare.oldRule.name;
    const newName = this.compare.newRule.name;
    const oldLimit = this.ruleListService.getRule(this.compare.oldRule.name);
    const newLimit = this.ruleListService.getRule(this.compare.newRule.name);
    const cards: Card[] = [];
    return [];
  }
}
