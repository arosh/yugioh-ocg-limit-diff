import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
import { RuleListItem } from 'app/rule-list-item';
import { Compare } from 'app/compare';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  compare: Compare;

  constructor(private ruleListService: BackendService) { }

  onCompareChange(compare: Compare) {
    this.compare = compare;
  }
}
