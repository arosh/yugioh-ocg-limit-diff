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
    paddingBottom: '50px',
  },
};

export default () =>
  <div className="container" style={styles.body}>
    <Header />
    <Notification />
    <Form />
    <Rule />
    <CardList />
    <Navigation />
  </div>;
