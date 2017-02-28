import React from 'react';

const CardItem = ({ hasLabel, labelLevel, labelText, cardName }) => {
  if (!hasLabel) {
    return (
      <li className="list-group-item">{cardName}</li>
    );
  }
  return (
    <li className="list-group-item">
      <span className={`label label-${labelLevel}`}>
        {labelText}
      </span> {cardName}
      {/*  spanとcardNameの間にスペースを入れる */}
    </li>
  );
};

CardItem.propTypes = {
  hasLabel: React.PropTypes.bool.isRequired,
  labelLevel: React.PropTypes.string.isRequired,
  labelText: React.PropTypes.string.isRequired,
  cardName: React.PropTypes.string.isRequired,
};

export default CardItem;
