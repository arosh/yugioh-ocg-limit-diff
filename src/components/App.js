// @flow
import React from 'react';
import Header from './Header';
import Notification from './Notification';
import Form from './Form';
import Rule from './Rule';
import CardList from './CardList';
import Navigation from './Navigation';

const styles = {
  body: {
    // Navigation のための padding
    paddingBottom: '50px',
  },
};

export default () =>
  <div style={styles.body}>
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-offset-2 col-md-8">
          <Header />
          <Notification />
          <Form />
          <Rule />
          <CardList />
        </div>
      </div>
    </div>
    <Navigation />
  </div>;
