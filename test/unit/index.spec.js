import { getReact, getDocument } from './stubs';
import proxyquire from 'proxyquire';
import should from 'should';

describe('index.js', () => {
  before(function before() {
    this.React = getReact();
    global.document = getDocument();
    this.index = proxyquire('../../src/index', {
      'react': this.React
    });
  });

  after(function after() {
    delete global.document;
  });

  it('should listen to document ready event', function it() {
    // then
    should(global.document.addEventListener.calledOnce).be.true();
  });

  it('should render index when document is ready', function it() {
    // given
    const docReadyCB = global.document._events.DOMContentLoaded;

    // when
    docReadyCB();

    // then
    should(this.React.render.calledOnce).be.true();
  });
});
