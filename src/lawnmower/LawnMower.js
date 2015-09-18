import { DEFAULTS, EVENTS } from '../common/constants';
import { percent } from '../common/utils';
import PositionStore from '../stores/PositionStore';
import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      style: {
        height: DEFAULTS.HEIGHT,
        width: DEFAULTS.WIDTH
      }
    };
  },

  componentDidMount() {
    this._onResetSub = PositionStore.subscribe(EVENTS.RESET, this._onReset);
    this._goLeftSub = PositionStore.subscribe(EVENTS.GO_LEFT, this._move);
    this._goRightSub = PositionStore.subscribe(EVENTS.GO_RIGHT, this._move);
    this._goUpSub = PositionStore.subscribe(EVENTS.GO_UP, this._move);
    this._goDownSub = PositionStore.subscribe(EVENTS.GO_DOWN, this._move);
  },

  componentWillUnmount() {
    this._onResetSub.unsubscribe();
    this._goLeftSub.unsubscribe();
    this._goRightSub.unsubscribe();
    this._goUpSub.unsubscribe();
    this._goDownSub.unsubscribe();
  },

  render() {
    return (
      <li className="lm-lawnMower" style={ this.state.style }>
        <img src="assets/lawn-mower.svg" className="lm-lawnMower__img" />
      </li>
    );
  },

  _onReset(opt = { row: DEFAULTS.SIZE, column: DEFAULTS.SIZE }) {
    console.info(`lawn mower reset: ${ opt.row } row, ${ opt.column } column`);
    this.setState({
      style: {
        height: percent(100 / opt.row),
        width: percent(100 / opt.column)
      }
    });
  },

  _move(position) {
    console.info(`lawn mower new position: ${ JSON.stringify(position) }`);
    const translateX = `${ 100 * position.x }%`;
    const translateY = `${ 100 * position.y }%`;
    this.setState({
      style: Object.assign(this.state.style, {
        transform: `translate(${ translateX }, ${ translateY })`
      })
    });
  }
});
