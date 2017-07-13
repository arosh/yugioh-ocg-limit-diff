// @flow
import React from 'react';
import { connect } from 'react-redux';
import CardItem from './CardItem';
import type { Card } from '../services/DiffService';

const CardItemCollections = (props: { items: Card[] }) =>
  <ul className="list-group">
    {props.items.map(item => <CardItem key={item.name} card={item} />)}
  </ul>;

class CardList extends React.Component {
  props: {
    zero: Card[],
    one: Card[],
    two: Card[],
    three: Card[],
  };
  render = () =>
    <div>
      <div className="panel panel-danger" id="list-zero">
        <div className="panel-heading">
          <h3 className="panel-title">禁止カード</h3>
        </div>
        <CardItemCollections items={this.props.zero} />
      </div>
      <div className="panel panel-warning" id="list-one">
        <div className="panel-heading">
          <h3 className="panel-title">制限カード</h3>
        </div>
        <CardItemCollections items={this.props.one} />
      </div>
      <div className="panel panel-info" id="list-two">
        <div className="panel-heading">
          <h3 className="panel-title">準制限カード</h3>
        </div>
        <CardItemCollections items={this.props.two} />
      </div>
      <div className="panel panel-success" id="list-three">
        <div className="panel-heading">
          <h3 className="panel-title">制限解除</h3>
        </div>
        <CardItemCollections items={this.props.three} />
      </div>
    </div>;
}

export default connect(state => ({
  zero: state.zero,
  one: state.one,
  two: state.two,
  three: state.three,
}))(CardList);
