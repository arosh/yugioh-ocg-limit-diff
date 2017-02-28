import React from 'react';
import CardItem from './CardItem';

const CardListPanel = ({ panelHeading, panelLevel, cardItems }) => {
  const items = cardItems.map(item =>
    <CardItem key={item.cardName} {...item} />);
  return (
    <div className={`panel panel-${panelLevel}`}>
      <div className="panel-heading">{panelHeading}</div>
      <ul className="list-group">
        {items}
      </ul>
    </div>
  );
};

CardListPanel.propTypes = {
  panelHeading: React.PropTypes.string.isRequired,
  panelLevel: React.PropTypes.string.isRequired,
  cardItems: React.PropTypes.arrayOf(React.PropTypes.shape(CardItem.propTypes)).isRequired,
};

export default CardListPanel;
