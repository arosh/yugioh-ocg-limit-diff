// @flow
import React from 'react';
import urlencode from 'urlencode';
import type { Card } from '../services/DiffService';

function hasLabel(prevStatus: string, nextStatus: string): boolean {
  return prevStatus !== nextStatus;
}

function labelText(prevStatus: string, nextStatus: string): string {
  let prevText: string;
  switch (prevStatus) {
    case 'zero':
      prevText = '禁止';
      break;
    case 'one':
      prevText = '制限';
      break;
    case 'two':
      prevText = '準制限';
      break;
    case 'three':
      prevText = '無制限';
      break;
    default:
      throw new Error(`prevStatus = ${prevStatus}`);
  }
  let nextText: string;
  switch (nextStatus) {
    case 'zero':
      nextText = '禁止';
      break;
    case 'one':
      nextText = '制限';
      break;
    case 'two':
      nextText = '準制限';
      break;
    case 'three':
      nextText = '制限解除';
      break;
    default:
      throw new Error(`nextStatus = ${nextStatus}`);
  }
  return `${prevText} > ${nextText}`;
}

function labelClass(prevStatus: string, nextStatus: string): string {
  const danger = 'label label-danger';
  const warning = 'label label-warning';
  const info = 'label label-info';
  const success = 'label label-success';
  switch (nextStatus) {
    case 'zero':
      switch (prevStatus) {
        case 'one':
          return danger;
        case 'two':
          return danger;
        case 'three':
          return danger;
        default:
          throw new Error(`prevStatus = ${prevStatus}`);
      }
    case 'one':
      switch (prevStatus) {
        case 'zero':
          return success;
        case 'two':
          return warning;
        case 'three':
          return warning;
        default:
          throw new Error(`prevStatus = ${prevStatus}`);
      }
    case 'two':
      switch (prevStatus) {
        case 'zero':
          return success;
        case 'one':
          return success;
        case 'three':
          return info;
        default:
          throw new Error(`prevStatus = ${prevStatus}`);
      }
    case 'three':
      switch (prevStatus) {
        case 'zero':
          return success;
        case 'one':
          return success;
        case 'two':
          return success;
        default:
          throw new Error(`prevStatus = ${prevStatus}`);
      }
    default:
      throw new Error(`nextStatus = ${nextStatus}`);
  }
}

const styles = {
  a: {
    color: 'inherit',
  },
  // btn: {
  //   marginTop: '-5px',
  //   fontSize: '14px',
  //   padding: '4px 10px',
  // },
};

function yugiohWikiUrl(name) {
  const pageName = `《${name}》`;
  const encoded = urlencode(pageName, 'EUC-JP');
  return `http://yugioh-wiki.net/index.php?cmd=read&page=${encoded}`;
}

// function xpgUrl(name) {
//   const encoded = urlencode(name, 'Shift_JIS');
//   return `https://ocg.xpg.jp/search/search.fcgi?Name=${encoded}&Mode=0`;
// }

// <a
//   className="btn btn-default"
//   href={xpgUrl(name)}
//   style={styles.btn}
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   <span className="glyphicon glyphicon-search" /> 遊戯王☆カード検索
// </a>

export default (props: { card: Card }) => {
  const { prevStatus, nextStatus, name } = props.card;

  return (
    <li className="list-group-item">
      {hasLabel(prevStatus, nextStatus) &&
        <span>
          <span className={labelClass(prevStatus, nextStatus)}>
            {labelText(prevStatus, nextStatus)}
          </span>{' '}
        </span>}
      <a
        href={yugiohWikiUrl(name)}
        target="_blank"
        style={styles.a}
        rel="noopener noreferrer"
      >
        <span className="fa fa-external-link" /> {name}
      </a>
    </li>
  );
};
