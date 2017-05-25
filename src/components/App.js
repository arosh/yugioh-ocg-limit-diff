// @flow
import React from 'react';
import Header from './Header';
import Notification from './Notification';
import Form from './Form';
import Rule from './Rule';

export default () => (
  <div className="container">
    <Header />
    <Notification />
    <Form />
    <Rule />
  </div>
);
