import React from 'react';
import { Container } from 'flux/utils';
import Store from '../flux/Store';

class Rule extends React.Component {
  state: {
    newName: string,
    newUrl: string,
    oldName: string,
    oldUrl: string,
  };
  static getStores() {
    return [Store];
  }
  static calculateState() {
    const state = Store.getState();

    return {
      newName: state.newName,
      newUrl: state.newUrl,
      oldName: state.oldName,
      oldUrl: state.oldUrl,
    };
  }
  render = () => (
    <div className="row">
      <div className="panel panel-default">
        <ul className="list-group">
          <li className="list-group-item">
            新レギュレーション：<a
              href={this.state.newUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.state.newName}
            </a>
          </li>
          <li className="list-group-item">
            旧レギュレーション：<a
              href={this.state.oldUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.state.oldName}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Container.create(Rule);