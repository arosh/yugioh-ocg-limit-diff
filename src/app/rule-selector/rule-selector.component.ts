import { Component, OnInit } from '@angular/core';
import { BackendService } from 'app/backend.service';
import { RuleListItem } from 'app/rule-list-item';
import { DiffService } from 'app/diff.service';

@Component({
  selector: 'app-rule-selector',
  templateUrl: './rule-selector.component.html',
})
export class RuleSelectorComponent implements OnInit {
  ruleList: RuleListItem[];
  newRuleName: string;
  oldRuleName: string;

  constructor(
    private ruleListService: BackendService,
    private diffService: DiffService) { }

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
    this.diffService.updateCompare({ newRule, oldRule });
  }
}
