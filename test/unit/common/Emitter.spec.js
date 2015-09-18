import should from 'should';
import sinon from 'sinon';

describe('Emitter', () => {
  let Emitter;

  before(() => {
    Emitter = require('../../../src/common/Emitter');
  });

  it('should return Emitter class', () => {
    // then
    should(Emitter).be.a.Function();
    should(Emitter.prototype.subscribe).be.a.Function();
    should(Emitter.prototype.emit).be.a.Function();
    should(Emitter.prototype.on).be.a.Function();
    should(Emitter.prototype.removeListener).be.a.Function();
  });

  it('should subscribe and return the subscription', () => {
    // given
    const emitter = new Emitter();
    const callback = sinon.spy();
    let subscription;

    // when
    subscription = emitter.subscribe('FOOBAR', callback);

    // then
    should(subscription).be.an.Object();
    should(subscription.unsubscribe).be.a.Function();
  });

  it('should unsubscribe', () => {
    // given
    const emitter = new Emitter();
    const callback = sinon.spy();
    const event = 'FOOBAR';
    const subscription = emitter.subscribe(event, callback);
    sinon.spy(emitter, 'removeListener');

    // when
    subscription.unsubscribe();

    // then
    should(emitter.removeListener.withArgs(event, callback).calledOnce).be.true();
  });
});
