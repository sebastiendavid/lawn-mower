import should from 'should';

describe('dispatcher', () => {
  let dispatcher;

  before(() => {
    dispatcher = require('../../../src/common/dispatcher');
  });

  it('should return an instance of Flux dispatcher', () => {
    should(dispatcher).be.an.Object();
    should(dispatcher.register).be.a.Function();
    should(dispatcher.dispatch).be.a.Function();
  });
});
