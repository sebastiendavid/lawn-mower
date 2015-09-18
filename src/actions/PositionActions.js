import { EVENTS } from '../common/constants';
import dispatcher from '../common/dispatcher';

export default {
  left() {
    dispatcher.dispatch({ type: EVENTS.GO_LEFT });
  },

  right() {
    dispatcher.dispatch({ type: EVENTS.GO_RIGHT });
  },

  up() {
    dispatcher.dispatch({ type: EVENTS.GO_UP });
  },

  down() {
    dispatcher.dispatch({ type: EVENTS.GO_DOWN });
  },

  updateGrid(grid) {
    dispatcher.dispatch({ type: EVENTS.UPDATE_GRID, grid: grid });
  },

  reset() {
    dispatcher.dispatch({ type: EVENTS.RESET });
  }
};
