import React from 'react';

class CardList extends React.Component {
  render() {
    const cardItems = this.props.cardItems.map(item => (
      <CardItem
        cardName={item.cardName} hasLabel={item.hasLabel}
        labelClass={item.labelClass} labelText={item.labelText}
        key={item.cardName}
      />
            ));
    return (
      <ul className="list-group">
        {cardItems}
      </ul>
    );
  }
}
