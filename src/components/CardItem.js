// @flow
import React from 'react';
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

export default (props: { card: Card }) => {
  const { prevStatus, nextStatus, name } = props.card;
  if (hasLabel(prevStatus, nextStatus)) {
    return (
      <li className="list-group-item">
        <span className={labelClass(prevStatus, nextStatus)}>
          {labelText(prevStatus, nextStatus)}
        </span>
        {' '}
        {name}
      </li>
    );
  } else {
    return <li className="list-group-item">{name}</li>;
  }
};
