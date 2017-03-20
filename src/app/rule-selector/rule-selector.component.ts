import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BackendService } from 'app/backend.service';
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

  constructor(
    private ruleListService: BackendService) { }

  ngOnInit() {
    this.ruleListService.getIndex().then((ruleList) => {
      this.ruleList = ruleList;
      this.newRuleName = this.ruleList[0].name;
      this.oldRuleName = this.ruleList[1].name;
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
