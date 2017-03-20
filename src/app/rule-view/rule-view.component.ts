import { Component, Input } from '@angular/core';
import { Compare } from 'app/compare';

@Component({
  selector: 'app-rule-view',
  templateUrl: './rule-view.component.html',
  styleUrls: ['./rule-view.component.css']
})
export class RuleViewComponent {
  @Input() compare: Compare;

  constructor() { }
}
