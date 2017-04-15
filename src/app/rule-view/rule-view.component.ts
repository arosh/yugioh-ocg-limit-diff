import { Component } from '@angular/core';
import { DiffService } from 'app/diff.service';

@Component({
  selector: 'app-rule-view',
  templateUrl: './rule-view.component.html',
})
export class RuleViewComponent {
  constructor(public diffService: DiffService) { }
}
