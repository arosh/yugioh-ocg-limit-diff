import React from 'react';

class CardItem extends React.Component {
  render() {
    if (!this.props.hasLabel) {
      return (
        <li className="list-group-item">{this.props.cardName}</li>
      );
    }
    return (
      <li className="list-group-item">
        <span className={this.props.labelClass}>
          {this.props.labelText}
        </span> {this.props.cardName}
        {/*  スペースの入れ方に注意 */}
      </li>
    );
  }
}
