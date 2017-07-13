import React from 'react';
import { connect } from 'react-redux';
import * as UseCase from '../flux/UseCase';

const Form = ({ items, newName, oldName }) =>
  <div className="panel panel-default">
    <div className="panel-body">
      <form>
        <div className="form-group">
          <label>新レギュレーション</label>
          <select
            id="select-newRule"
            className="form-control"
            value={newName}
            onChange={e => UseCase.updateRule(e.target.value, oldName)}
          >
            {items.map(item =>
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            )}
          </select>
        </div>
        <div className="form-group">
          <label>旧レギュレーション</label>
          <select
            id="select-oldRule"
            className="form-control"
            value={oldName}
            onChange={e => UseCase.updateRule(newName, e.target.value)}
          >
            {items.map(item =>
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            )}
          </select>
        </div>
      </form>
    </div>
  </div>;

export default connect(state => ({
  items: state.selectOptions,
  newName: state.newName,
  oldName: state.oldName,
}))(Form);
