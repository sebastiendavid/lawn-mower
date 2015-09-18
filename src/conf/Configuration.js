import { DEFAULTS } from '../common/constants';
import { toNumber } from '../common/utils';
import Commands from './Commands';
import PositionActions from '../actions/PositionActions';
import React from 'react';

export default React.createClass({
  _getGridInputs() {
    return {
      row: toNumber(this.refs.row.getDOMNode().value, DEFAULTS.SIZE),
      column: toNumber(this.refs.column.getDOMNode().value, DEFAULTS.SIZE)
    };
  },

  _onUpdate() {
    PositionActions.updateGrid(this._getGridInputs());
  },

  _onReset() {
    PositionActions.reset();
  },

  render() {
    return (
      <section className="lm-conf">
        <h1>Configuration</h1>
        <div>
          <ul className="lm-conf__lines">
            <li className="lm-conf__line">
              <span className="lm-conf__label">Row:</span>
              <input ref="row" className="lm-conf__input" type="number" min="2" max="10"/>
            </li>
            <li className="lm-conf__line">
              <span className="lm-conf__label">Column:</span>
              <input ref="column" className="lm-conf__input" type="number" min="2" max="10"/>
            </li>
            <li className="lm-conf__line update">
              <button className="lm-conf__update" onClick={ this._onUpdate }>Update</button>
            </li>
          </ul>
          <button className="lm-conf__reset" onClick={ this._onReset }>Reset</button>
        </div>
        <Commands />
      </section>
    );
  }
});
