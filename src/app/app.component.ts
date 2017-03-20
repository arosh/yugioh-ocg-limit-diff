import { Component } from '@angular/core';
import { BackendService } from './backend.service';
import { Compare } from 'app/compare';
import { DiffService } from 'app/diff.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  compare: Compare;

  constructor(
    private ruleListService: BackendService,
    private diffService: DiffService) { }

  onCompareChange(compare: Compare) {
    this.compare = compare;
    this.diffService.updateCompare(compare);
  }
}
