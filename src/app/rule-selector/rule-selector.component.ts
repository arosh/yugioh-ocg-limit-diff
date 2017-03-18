import { Component, OnInit } from '@angular/core';
import { RuleListService } from 'app/rule-list.service';
import { RuleListItem } from 'app/rule-list-item';

@Component({
  selector: 'app-rule-selector',
  templateUrl: './rule-selector.component.html',
  styleUrls: ['./rule-selector.component.css']
})
export class RuleSelectorComponent implements OnInit {
  private ruleList: RuleListItem[];
  private newRule: string;
  private oldRule: string;
  constructor(private ruleListService: RuleListService) { }

  ngOnInit() {
    this.ruleListService.getIndex().then((ruleList) => {
      this.ruleList = ruleList;
      this.newRule = this.ruleList[this.ruleList.length - 1].name;
      this.oldRule = this.ruleList[this.ruleList.length - 2].name;
    });
  }

  onChange() {
    console.log(`${this.newRule} - ${this.oldRule}`)
  }
}
