import React from 'react';
import { Container } from 'flux/utils';
import Store from '../flux/Store';

class Rule extends React.Component {
  state: {
    newRule: string,
    newUrl: string,
    oldRule: string,
    oldUrl: string,
  };
  static getStores() {
    return [Store];
  }
  static calculateState() {
    const state = Store.getState();
    return {
      newRule: state.newRule,
      newUrl: state.newUrl,
      oldRule: state.oldRule,
      oldUrl: state.oldUrl,
    };
  }
  render = () => (
    <div className="panel panel-default">
      <ul className="list-group">
        <li className="list-group-item">
          新レギュレーション：<a
            href={this.state.newUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.newRule}
          </a>
        </li>
        <li className="list-group-item">
          旧レギュレーション：<a
            href={this.state.oldUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.state.oldRule}
          </a>
        </li>
      </ul>
    </div>
  );
}
export default Container.create(Rule);
