import should from 'should';

describe('constants', () => {
  let constants;

  before(() => {
    constants = require('../../../src/common/constants');
  });

  it('should have categories for constants', () => {
    // then
    should(constants.DEFAULTS).be.an.Object();
    should(constants.EVENTS).be.an.Object();
  });

  it('should have defaults constants', () => {
    // then
    should(constants.DEFAULTS.SIZE).be.a.Number().and.above(0);
    should(constants.DEFAULTS.HEIGHT).be.a.String().and.not.empty();
    should(constants.DEFAULTS.WIDTH).be.a.String().and.not.empty();
  });

  it('should have events constants', () => {
    // then
    should(constants.EVENTS.UPDATE_GRID).be.a.String().and.not.empty();
    should(constants.EVENTS.GO_LEFT).be.a.String().and.not.empty();
    should(constants.EVENTS.GO_RIGHT).be.a.String().and.not.empty();
    should(constants.EVENTS.GO_UP).be.a.String().and.not.empty();
    should(constants.EVENTS.GO_DOWN).be.a.String().and.not.empty();
    should(constants.EVENTS.RESET).be.a.String().and.not.empty();
    should(constants.EVENTS.updateBlockEvent).be.a.Function();
  });

  it('should return update block event', () => {
    // given
    const x = 1;
    const y = 2;
    let result;

    // when
    result = constants.EVENTS.updateBlockEvent(x, y);

    // then
    should(result).containEql(x.toString());
    should(result).containEql(y.toString());
  });
});
