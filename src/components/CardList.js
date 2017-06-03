// @flow
import React from 'react';
import { Container } from 'flux/utils';
import Store from '../flux/Store';
import CardItem from './CardItem';
import type { Card } from '../services/DiffService';

const CardItemCollections = (props: { items: Card[] }) =>
  <ul className="list-group">
    {props.items.map(item => <CardItem key={item.name} card={item} />)}
  </ul>;

class CardList extends React.Component {
  state: {
    zero: Card[],
    one: Card[],
    two: Card[],
    three: Card[],
  };
  static getStores() {
    return [Store];
  }
  static calculateState() {
    const { zero, one, two, three } = Store.getState();
    return { zero, one, two, three };
  }
  render = () =>
    <div>
      <div className="panel panel-danger">
        <div className="panel-heading">禁止カード</div>
        <CardItemCollections items={this.state.zero} />
      </div>
      <div className="panel panel-warning">
        <div className="panel-heading">制限カード</div>
        <CardItemCollections items={this.state.one} />
      </div>
      <div className="panel panel-info">
        <div className="panel-heading">準制限カード</div>
        <CardItemCollections items={this.state.two} />
      </div>
      <div className="panel panel-success">
        <div className="panel-heading">制限解除</div>
        <CardItemCollections items={this.state.three} />
      </div>
    </div>;
}

export default Container.create(CardList);
