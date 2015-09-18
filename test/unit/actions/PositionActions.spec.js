import { getDispatcher } from '../stubs';
import { EVENTS } from '../../../src/common/constants';
import proxyquire from 'proxyquire';
import should from 'should';
import sinon from 'sinon';

describe('PositionActions', () => {
  let dispatcher;
  let PositionActions;

  before(() => {
    dispatcher = getDispatcher();
    PositionActions = proxyquire('../../../src/actions/PositionActions', {
      '../common/dispatcher': dispatcher
    });
  });

  beforeEach(() => {
    dispatcher.dispatch.reset();
  });

  it('should have API', () => {
    // then
    should(PositionActions.left).be.a.Function();
    should(PositionActions.right).be.a.Function();
    should(PositionActions.up).be.a.Function();
    should(PositionActions.down).be.a.Function();
    should(PositionActions.updateGrid).be.a.Function();
    should(PositionActions.reset).be.a.Function();
  });

  it('should request to go left', () => {
    // when
    PositionActions.left();

    // then
    should(dispatcher.dispatch.withArgs(sinon.match({ type: EVENTS.GO_LEFT })).calledOnce).be.true();
  });

  it('should request to go right', () => {
    // when
    PositionActions.right();

    // then
    should(dispatcher.dispatch.withArgs(sinon.match({ type: EVENTS.GO_RIGHT })).calledOnce).be.true();
  });

  it('should request to go up', () => {
    // when
    PositionActions.up();

    // then
    should(dispatcher.dispatch.withArgs(sinon.match({ type: EVENTS.GO_UP })).calledOnce).be.true();
  });

  it('should request to go down', () => {
    // when
    PositionActions.down();

    // then
    should(dispatcher.dispatch.withArgs(sinon.match({ type: EVENTS.GO_DOWN })).calledOnce).be.true();
  });

  it('should request to upgrade grid', () => {
    // given
    const opt = { foo: 'bar' };

    // when
    PositionActions.updateGrid(opt);

    // then
    should(dispatcher.dispatch.withArgs(sinon.match({ type: EVENTS.UPDATE_GRID, grid: opt })).calledOnce).be.true();
  });

  it('should request to reset', () => {
    // when
    PositionActions.reset();

    // then
    should(dispatcher.dispatch.withArgs(sinon.match({ type: EVENTS.RESET })).calledOnce).be.true();
  });
});
