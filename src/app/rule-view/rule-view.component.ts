import { Component, Input } from '@angular/core';
import { Compare } from 'app/compare';
import { DiffService } from "app/diff.service";

@Component({
  selector: 'app-rule-view',
  templateUrl: './rule-view.component.html',
})
export class RuleViewComponent {
  constructor(private diffService: DiffService) { }
}
