import should from 'should';
import sinon from 'sinon';

describe('utils', () => {
  let utils;

  before(() => {
    utils = require('../../../src/common/utils');
  });

  it('should format percent value', () => {
    // given
    let result;

    // when
    result = utils.percent(50);

    // then
    should(result).be.equal('50%');
  });

  it('should format px value', () => {
    // given
    let result;

    // when
    result = utils.px(50);

    // then
    should(result).be.equal('50px');
  });

  it('should loop over n times', () => {
    // given
    const callback = sinon.spy();

    // when
    utils.times(3, callback);

    // then
    should(callback.callCount).be.equal(3);
  });

  it('should loop over n times and return results if callback return something', () => {
    // given
    const callback = () => 'foobar';
    let result;

    // when
    result = utils.times(3, callback);

    // then
    should(result).be.an.Array().and.have.a.lengthOf(3);
  });
});
