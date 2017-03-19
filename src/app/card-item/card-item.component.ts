import { Component, Input } from '@angular/core';
import { Card } from 'app/card';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {
  @Input() card: Card;

  constructor() { }

  get hasLabel(): boolean {
    return this.card.prevStatus !== this.card.nextStatus;
  }

  get labelText(): string {
    let prevText: string;
    switch (this.card.prevStatus) {
      case 'zero':
        prevText = '禁止';
        break;
      case 'one':
        prevText = '制限';
        break;
      case 'two':
        prevText = '準制限';
        break;
      case 'three':
        prevText = '無制限';
        break;
    }
    let nextText: string;
    switch (this.card.prevStatus) {
      case 'zero':
        nextText = '禁止';
        break;
      case 'one':
        nextText = '制限';
        break;
      case 'two':
        nextText = '準制限';
        break;
      case 'three':
        nextText = '制限解除';
        break;
    }
    return `${prevText} > ${nextText}`;
  }

  get labelClass(): string {
    const danger = 'label label-danger';
    const warning = 'label label-warning';
    const info = 'label label-info';
    const success = 'label label-success';
    switch (this.card.nextStatus) {
      case 'zero':
        switch (this.card.prevStatus) {
          case 'one':
            return danger;
          case 'two':
            return danger;
          case 'three':
            return danger;
        }
        break;
      case 'one':
        switch (this.card.prevStatus) {
          case 'zero':
            return success;
          case 'two':
            return warning;
          case 'three':
            return warning;
        }
        break;
      case 'two':
        switch (this.card.prevStatus) {
          case 'zero':
            return success;
          case 'one':
            return success;
          case 'three':
            return info;
        }
        break;
      case 'three':
        switch (this.card.prevStatus) {
          case 'zero':
            return success;
          case 'one':
            return success;
          case 'two':
            return success;
        }
        break;
    }
    return '';
  }
}
