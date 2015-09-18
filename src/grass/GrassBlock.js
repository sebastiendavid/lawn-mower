import { DEFAULTS, EVENTS } from '../common/constants';
import PositionStore from '../stores/PositionStore';
import React from 'react';

export default React.createClass({
  propTypes: {
    height: React.PropTypes.string,
    width: React.PropTypes.string,
    position: React.PropTypes.object
  },

  getInitialState() {
    return { mown: false };
  },

  getDefaultProps() {
    return {
      height: DEFAULTS.HEIGHT,
      width: DEFAULTS.WIDTH,
      position: {}
    };
  },

  componentDidMount() {
    console.log('BLOCK: componentDidMount');
    const x = this.props.position.x;
    const y = this.props.position.y;
    this._upBlockSub = PositionStore.subscribe(EVENTS.updateBlockEvent(x, y), this._onUpdate);
  },

  componentWillReceiveProps() {
    console.log('BLOCK: componentWillReceiveProps');
    if (this.state.mown) {
      this.setState({ mown: false });
    }
  },

  componentWillUnmount() {
    console.log('BLOCK: componentWillUnmount');
    this._upBlockSub.unsubscribe();
  },

  render() {
    const mown = this.state.mown || (this.props.position.x === 0 && this.props.position.y === 0);
    return (
      <li className="lm-grassGrid__block" style={{ width: this.props.width, height: this.props.height }}
        data-x={ this.props.position.x } data-y={ this.props.position.y }>
        <div className={ `lm-grassGrid__grass ${ mown ? 'mown' : '' }` }></div>
      </li>
    );
  },

  _onUpdate() {
    if (!this.state.mown) {
      this.setState({ mown: true });
    }
  }
});
