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

export default () =>
  <div>
    <h1 className="text-center">
      <span style={{ display: 'inline-block' }}>遊戯王</span>{' '}
      <span style={{ display: 'inline-block' }}>禁止制限比較ツール</span>
      <span style={{ display: 'inline-block' }}>
        {document.title.substr(13)}
      </span>
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
