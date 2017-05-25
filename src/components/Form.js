// @flow
import React from 'react';
import ProviderService from '../services/ProviderService';
import type { IndexItem } from '../services/ProviderService';
import UseCase from '../flux/UseCase';

export default class Form extends React.Component {
  state: {
    items: IndexItem[],
    newRule: string,
    oldRule: string,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      newRule: '',
      oldRule: '',
    };
    this.initializeItems();
  }

  initializeItems = async () => {
    const items = await ProviderService.fetchIndex();
    items.reverse();
    this.setState(
      {
        items,
        newRule: items[0].name,
        oldRule: items[1].name,
      },
      () => {
        this.dispatch();
      }
    );
  };

  dispatch = () => {
    UseCase.updateRule(this.state.newRule, this.state.oldRule);
  };

  onChange = (key: string, value: string) => {
    this.setState(
      {
        [key]: value,
      },
      () => {
        this.dispatch();
      }
    );
  };

  render = () => (
    <div className="panel panel-default">
      <div className="panel-body">
        <form>
          <div className="form-group">
            <label>新レギュレーション</label>
            <select
              id="select-newRule"
              className="form-control"
              value={this.state.newRule}
              onChange={e => this.onChange('newRule', e.target.value)}
            >
              {this.state.items.map(item => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>旧レギュレーション</label>
            <select
              id="select-oldRule"
              className="form-control"
              value={this.state.oldRule}
              onChange={e => this.onChange('oldRule', e.target.value)}
            >
              {this.state.items.map(item => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
