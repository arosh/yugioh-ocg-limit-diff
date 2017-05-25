// @flow
import React from 'react';
import { Container } from 'flux/utils';
import Store from '../flux/Store';
import CardItem from './CardItem';
import type { Card } from '../services/DiffService';

const CardItemCollections = (props: { items: Card[] }) => (
  <ul className="list-group">
    {props.items.map(item => <CardItem key={item.name} card={item} />)}
  </ul>
);

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
  render = () => (
    <div>
      <div className="panel panel-danger">
        <div className="panel-heading">禁止カード</div>
        <ul className="list-group">
          <CardItemCollections items={this.state.zero} />
        </ul>
      </div>
      <div className="panel panel-warning">
        <div className="panel-heading">制限カード</div>
        <ul className="list-group">
          <CardItemCollections items={this.state.one} />
        </ul>
      </div>
      <div className="panel panel-info">
        <div className="panel-heading">準制限カード</div>
        <ul className="list-group">
          <CardItemCollections items={this.state.two} />
        </ul>
      </div>
      <div className="panel panel-success">
        <div className="panel-heading">制限解除</div>
        <ul className="list-group">
          <CardItemCollections items={this.state.three} />
        </ul>
      </div>
    </div>
  );
}

export default Container.create(CardList);
