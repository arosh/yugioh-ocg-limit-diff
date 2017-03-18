import { Component, OnInit } from '@angular/core';
import { RuleListService } from './rule-list.service';
import { RuleListItem } from 'app/rule-list-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ruleList: RuleListItem[] = [];

  constructor(private ruleListService: RuleListService) { }

  ngOnInit() {
    this.ruleListService.getIndex().then((ruleList) => {
      this.ruleList = ruleList;
    });
  }
}
