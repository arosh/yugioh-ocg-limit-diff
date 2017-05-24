// @flow
import React from 'react';
import ProviderService from '../services/ProviderService';
import type { ListItem } from '../services/ProviderService';

export default class Form extends React.Component {
  state: {
    items: ListItem[],
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
    this.setState({
      items,
      newRule: items[0].name,
      oldRule: items[1].name,
    });
  };

  render = () => (
    <div className="row">
      <div className="panel panel-default">
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>新レギュレーション</label>
              <select
                className="form-control"
                value={this.state.newRule}
                onChange={e => this.setState({ newRule: e.target.value })}
              >
                {this.state.items.map(item => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>旧レギュレーション</label>
              <select
                className="form-control"
                value={this.state.oldRule}
                onChange={e => this.setState({ oldRule: e.target.value })}
              >
                {this.state.items.map(item => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
