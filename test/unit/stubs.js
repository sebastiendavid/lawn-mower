import sinon from 'sinon';

export function getReact() {
  const React = {
    createClass: sinon.spy(opt => {
      Object.assign(opt, {
        setState: sinon.spy(function ss(_opt) {
          Object.assign(opt.state || {}, _opt);
        })
      });
      (opt.mixins || []).forEach(mixin => Object.assign(opt, mixin));
      return opt;
    }),
    createElement: sinon.spy(() => React),
    unmountComponentAtNode: sinon.spy(),
    render: sinon.spy(),
    PropTypes: {},
    '@noCallThru': true
  };
  return React;
}

export function getDocument() {
  const doc = {
    _events: {},
    addEventListener: sinon.spy((event, cb) => doc._events[event] = cb),
    getElementById: sinon.spy()
  };
  return doc;
}

export function getDispatcher() {
  return {
    dispatch: sinon.spy()
  };
}
