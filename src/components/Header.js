// @flow
import React from 'react';
const btnTwitterStyle = {
  color: '#fff',
  backgroundColor: '#55acee',
  borderColor: '#4ca7ed',
};

export default () =>
  <div>
    <h1 className="text-center">遊戯王 禁止制限比較（2017年7月1日制限改定対応）</h1>
    <div className="clearfix">
      <div className="pull-right">
        {/*TODO: titleタグの中身とh1タグの中身とシェアボタンのツイート内容を同期させる*/}
        <a
          href="http://twitter.com/intent/tweet?url=https%3A%2F%2Fyugioh-f05e3.firebaseapp.com%2F&text=%e9%81%8a%e6%88%af%e7%8e%8b%20%e7%a6%81%e6%ad%a2%e5%88%b6%e9%99%90%e6%af%94%e8%bc%83%ef%bc%882017%e5%b9%b47%e6%9c%881%e6%97%a5%e5%88%b6%e9%99%90%e6%94%b9%e5%ae%9a%e5%af%be%e5%bf%9c%ef%bc%89"
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
