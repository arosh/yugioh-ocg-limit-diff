// @flow
import React from 'react';
import { connect } from 'react-redux';

class Rule extends React.Component {
  props: {
    newName: string,
    newUrl: string,
    oldName: string,
    oldUrl: string,
  };
  render = () =>
    <div className="panel panel-default">
      <ul className="list-group">
        <li className="list-group-item">
          新レギュレーション：<a
            id="link-newRule"
            href={this.props.newUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.newName}
          </a>
        </li>
        <li className="list-group-item">
          旧レギュレーション：<a
            id="link-oldRule"
            href={this.props.oldUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.oldName}
          </a>
        </li>
      </ul>
    </div>;
}

export default connect(state => ({
  newName: state.newName,
  newUrl: state.newUrl,
  oldName: state.oldName,
  oldUrl: state.oldUrl,
}))(Rule);
