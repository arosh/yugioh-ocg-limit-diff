import React from 'react';

const RuleSelector = () => {
  const options = this.props.rules.map(rule =>
    <option value={rule.key} key={rule.key}>{rule.name}</option>);
  return (
    <form>
      <div className="form-group">
        <label htmlFor="new-regulation">新レギュレーション</label>
        <select
          name="new-regulation"
          className="form-control"
          onChange={this.onNewRegulationChange.bind(this)}
          value={this.props.newKey}
        >
          {options}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="old-regulation">旧レギュレーション</label>
        <select
          name="old-regulation"
          className="form-control"
          onChange={this.onOldRegulationChange.bind(this)}
          value={this.props.oldKey}
        >
          {options}
        </select>
      </div>
    </form>
  );
};

export default RuleSelector;
