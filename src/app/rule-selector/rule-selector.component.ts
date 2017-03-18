import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RuleListService } from 'app/rule-list.service';
import { RuleListItem } from 'app/rule-list-item';
import { Compare } from 'app/compare';

@Component({
  selector: 'app-rule-selector',
  templateUrl: './rule-selector.component.html',
  styleUrls: ['./rule-selector.component.css']
})
export class RuleSelectorComponent implements OnInit {
  ruleList: RuleListItem[];
  newRuleName: string;
  oldRuleName: string;
  @Output() submit = new EventEmitter<Compare>();

  constructor(private ruleListService: RuleListService) { }

  ngOnInit() {
    this.ruleListService.getIndex().then((ruleList) => {
      this.ruleList = ruleList;
      this.newRuleName = this.ruleList[this.ruleList.length - 1].name;
      this.oldRuleName = this.ruleList[this.ruleList.length - 2].name;
    }).then(() => {
      this.onChange();
    });
  }

  onChange() {
    const newRule = this.ruleList.find((value) => value.name === this.newRuleName);
    const oldRule = this.ruleList.find((value) => value.name === this.oldRuleName);
    this.submit.emit({
      newRule,
      oldRule,
    });
  }
}
