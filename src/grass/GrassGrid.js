import { DEFAULTS, EVENTS } from '../common/constants';
import { percent, times } from '../common/utils';
import GrassBlock from './GrassBlock';
import LawnMower from '../lawnmower/LawnMower';
import PositionStore from '../stores/PositionStore';
import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      row: DEFAULTS.SIZE,
      column: DEFAULTS.SIZE,
      blocks: DEFAULTS.SIZE * DEFAULTS.SIZE,
      size: { height: DEFAULTS.HEIGHT, width: DEFAULTS.WIDTH }
    };
  },

  componentDidMount() {
    this._updateSub = PositionStore.subscribe(EVENTS.UPDATE_GRID, this._onUpdate);
    this._resetSub = PositionStore.subscribe(EVENTS.RESET, this._onReset);
  },

  componentWillUnmount() {
    this._updateSub.unsubscribe();
    this._resetSub.unsubscribe();
  },

  render() {
    const time = new Date().getTime();
    let x = -1;
    let y = 0;
    return (
      <section className="lm-grassGrid">
        <h1>GrassGrid</h1>
        <ul className="lm-grassGrid__blocks">
          { times(this.state.blocks, index => {
            x += 1;
            if (x >= this.state.column) {
              x = 0;
              y += 1;
            }
            return <GrassBlock key={ `${ time }:${ index }` } { ...this.state.size } position={{ x: x, y: y }} />;
          }) }
          <LawnMower />
        </ul>
      </section>
    );
  },

  _onUpdate(opt = { row: DEFAULTS.SIZE, column: DEFAULTS.SIZE }) {
    console.info(`grid update: ${ opt.row } row, ${ opt.column } column`);
    this.setState({
      row: opt.row,
      column: opt.column,
      blocks: opt.row * opt.column,
      size: { width: percent(100 / opt.column), height: percent(100 / opt.row) }
    });
  },

  _onReset() {
    this.forceUpdate();
  }
});
