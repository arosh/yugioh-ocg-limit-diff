// @flow
import React from 'react';
const btnTwitterStyle = {
  color: '#fff',
  backgroundColor: '#55acee',
  borderColor: '#4ca7ed',
  marginBottom: '12px',
};

const url = encodeURIComponent('https://yugioh-f05e3.firebaseapp.com/');
const tweetUrl = `http://twitter.com/intent/tweet?url=${url}&text=${document.title}`;

const Text = ({ children }) =>
  <span style={{ display: 'inline-block' }}>
    {children}
  </span>;

export default () =>
  <div>
    <h1 className="text-center">
      <Text>{document.title.substr(0, 3)}</Text>{' '}
      <Text>{document.title.substr(4, 4)}</Text>
      <Text>{document.title.substr(8, 5)}</Text>
      <Text>{document.title.substr(13)}</Text>
    </h1>
    <div className="clearfix">
      <div className="pull-right">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn"
          style={btnTwitterStyle}
        >
          <i className="fa fa-twitter fa-lg" /> ツイート
        </a>
      </div>
    </div>
  </div>;
