import React from 'react';

class CardView extends React.Component {
  render() {
    const difference = this.props.computeDifference(this.props.newKey, this.props.oldKey);
    return (
      <div>
        <div className="panel panel-danger">
          <div className="panel-heading">禁止カード</div>
          <CardList cardItems={difference.forbiddenCardItems} />
        </div>
        <div className="panel panel-warning">
          <div className="panel-heading">制限カード</div>
          <CardList cardItems={difference.oneCardItems} />
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">準制限カード</div>
          <CardList cardItems={difference.twoCardItems} />
        </div>
        <div className="panel panel-success">
          <div className="panel-heading">制限解除</div>
          <CardList cardItems={difference.freeCardItems} />
        </div>
      </div>
    );
  }
}
