import PositionActions from '../actions/PositionActions';
import React from 'react';

export default React.createClass({
  getInitialState() {
    return { focusClass: 'blur', arrowStatus: '' };
  },

  componentDidMount() {
    this._docClickCB = () => this._onDocClick();
    document.addEventListener('click', this._docClickCB);
    this._focus();
  },

  componentWillUnmount() {
    document.removeEventListener('click', this._docClickCB);
  },

  _focus() {
    this.refs.input.getDOMNode().focus();
  },

  _onDocClick() {
    this._focus();
  },

  _onFocus() {
    this.setState({ focusClass: 'focus' });
  },

  _onBlur() {
    this.setState({ focusClass: 'blur' });
  },

  _go(direction) {
    switch (direction) {
    case 'up':
      PositionActions.up();
      break;
    case 'down':
      PositionActions.down();
      break;
    case 'left':
      PositionActions.left();
      break;
    case 'right':
      PositionActions.right();
      break;
    default:
      // no op
    }
  },

  _onKeyDown() {
    switch (event.keyCode) {
    case 37:
      this.setState({ arrowStatus: 'left' });
      break;
    case 38:
      this.setState({ arrowStatus: 'up' });
      break;
    case 39:
      this.setState({ arrowStatus: 'right' });
      break;
    case 40:
      this.setState({ arrowStatus: 'down' });
      break;
    default:
      // no op
    }
  },

  _onKeyUp(event) {
    this.setState({ arrowStatus: '' });
    switch (event.keyCode) {
    case 37:
      this._go('left');
      break;
    case 38:
      this._go('up');
      break;
    case 39:
      this._go('right');
      break;
    case 40:
      this._go('down');
      break;
    default:
      // no op
    }
  },

  _onUpClick(event) {
    event.preventDefault();
    this._go('up');
  },

  _onDownClick(event) {
    event.preventDefault();
    this._go('down');
  },

  _onLeftClick(event) {
    event.preventDefault();
    this._go('left');
  },

  _onRightClick(event) {
    event.preventDefault();
    this._go('right');
  },

  render() {
    return (
      <section className="lm-commands">
        <h2 className={ `lm-commands__title ${ this.state.focusClass }` }>Commands</h2>
        <input ref="input" type="text" className="lm-commands__input" maxLength="1" onKeyUp={ this._onKeyUp }
          onKeyDown={ this._onKeyDown } onFocus={ this._onFocus } onBlur={ this._onBlur }/>
        <ul className={ `lm-commands__arrows ${ this.state.arrowStatus }` }>
          <li className="lm-commands__arrow up">
            <a className="lm-commands__button up" href="#up" onClick={ this._onUpClick }>&#8593;</a>
          </li>
          <li className="lm-commands__arrow left">
            <a className="lm-commands__button left" href="#left" onClick={ this._onLeftClick }>&#8592;</a>
          </li>
          <li className="lm-commands__arrow down">
            <a className="lm-commands__button down" href="#down" onClick={ this._onDownClick }>&#8595;</a>
          </li>
          <li className="lm-commands__arrow right">
            <a className="lm-commands__button right" href="#right" onClick={ this._onRightClick }>&#8594;</a>
          </li>
        </ul>
      </section>
    );
  }
});
