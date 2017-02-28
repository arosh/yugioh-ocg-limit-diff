import React from 'react';

const RuleView = () => {
  const newUrl = this.props.keyToUrl[this.props.newKey];
  const newName = this.props.keyToName[this.props.newKey];
  const oldUrl = this.props.keyToUrl[this.props.oldKey];
  const oldName = this.props.keyToName[this.props.oldKey];
  return (
    <ul className="list-group">
      <li className="list-group-item">
        新レギュレーション：<a href={newUrl}>
          {newName}
        </a>
      </li>
      <li className="list-group-item">
        旧レギュレーション：<a href={oldUrl}>
          {oldName}
        </a>
      </li>
    </ul>
  );
};

export default RuleView;
