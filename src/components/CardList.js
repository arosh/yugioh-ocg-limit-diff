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
      <div className="panel panel-danger" id="list-zero">
        <div className="panel-heading">
          <h3 className="panel-title">禁止カード</h3>
        </div>
        <CardItemCollections items={this.state.zero} />
      </div>
      <div className="panel panel-warning" id="list-one">
        <div className="panel-heading">
          <h3 className="panel-title">制限カード</h3>
        </div>
        <CardItemCollections items={this.state.one} />
      </div>
      <div className="panel panel-info" id="list-two">
        <div className="panel-heading">
          <h3 className="panel-title">準制限カード</h3>
        </div>
        <CardItemCollections items={this.state.two} />
      </div>
      <div className="panel panel-success" id="list-three">
        <div className="panel-heading">
          <h3 className="panel-title">制限解除</h3>
        </div>
        <CardItemCollections items={this.state.three} />
      </div>
    </div>;
}

export default Container.create(CardList);
