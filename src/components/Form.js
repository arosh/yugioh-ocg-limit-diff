import React from 'react';

export default class Form extends React.Component {
  render = () => (
    <div className="row">
      <div className="panel panel-default">
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>新レギュレーション</label>
              <select className="form-control">
                <option>name</option>
              </select>
            </div>
            <div className="form-group">
              <label>旧レギュレーション</label>
              <select className="form-control">
                <option>name</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
