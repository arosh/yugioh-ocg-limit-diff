import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Card } from 'app/card';
import { DiffService } from 'app/diff.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  @Input() panelType: string;
  cardItems: Card[];

  constructor(private diffService: DiffService) { }

  ngOnInit(): void {
    this.subscription = this.diffService.update.subscribe(() => {
      switch (this.panelType) {
        case 'zero':
          this.cardItems = this.diffService.zero;
          break;
        case 'one':
          this.cardItems = this.diffService.one;
          break;
        case 'two':
          this.cardItems = this.diffService.two;
          break;
        case 'three':
          this.cardItems = this.diffService.three;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get heading(): string {
    switch (this.panelType) {
      case 'zero':
        return '禁止カード';
      case 'one':
        return '制限カード';
      case 'two':
        return '準制限カード';
      case 'three':
        return '制限解除';
    }
  }

  get panelClass(): string {
    switch (this.panelType) {
      case 'zero':
        return 'panel panel-danger';
      case 'one':
        return 'panel panel-warning';
      case 'two':
        return 'panel panel-info';
      case 'three':
        return 'panel panel-success';
    }
  }
}
