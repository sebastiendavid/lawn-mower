import { DEFAULTS, EVENTS } from '../common/constants';
import dispatcher from '../common/dispatcher';
import Emitter from '../common/Emitter';

const data = {
  position: { x: 0, y: 0 },
  grid: { row: DEFAULTS.SIZE, column: DEFAULTS.SIZE }
};

class PositionStore extends Emitter {
  constructor() {
    super();
  }

  isValidPosition(position) {
    if (position.x < 0 || position.x > data.grid.column - 1) {
      return false;
    } else if (position.y < 0 || position.y > data.grid.row - 1) {
      return false;
    }
    return true;
  }

  isSameGrid(grid) {
    return grid.row === data.grid.row && grid.column === data.grid.column;
  }

  update(newPosition) {
    console.info('update position: ' + JSON.stringify(newPosition));
    Object.assign(data.position, newPosition);
  }

  requestUpdate(position, EVENT) {
    const newPosition = Object.assign({}, data.position, position);
    if (this.isValidPosition(newPosition)) {
      this.update(newPosition);
      this.emit(EVENT, newPosition);
      this.emit(EVENTS.updateBlockEvent(newPosition.x, newPosition.y));
    }
  }

  left() {
    this.requestUpdate({ x: data.position.x - 1 }, EVENTS.GO_LEFT);
  }

  right() {
    this.requestUpdate({ x: data.position.x + 1 }, EVENTS.GO_RIGHT);
  }

  up() {
    this.requestUpdate({ y: data.position.y - 1 }, EVENTS.GO_UP);
  }

  down() {
    this.requestUpdate({ y: data.position.y + 1 }, EVENTS.GO_DOWN);
  }

  updateGrid(grid = { row: DEFAULTS.SIZE, column: DEFAULTS.SIZE }) {
    if (this.isSameGrid(grid)) {
      return;
    }
    if (grid.row >= 2 && grid.row <= DEFAULTS.SIZE && grid.column >= 2 && grid.column <= DEFAULTS.SIZE) {
      Object.assign(data.grid, grid);
      this.emit(EVENTS.UPDATE_GRID, data.grid);
      this.reset();
    }
  }

  reset() {
    data.position = { x: 0, y: 0 };
    this.emit(EVENTS.RESET, data.grid);
  }
}

const positionStore = new PositionStore();

dispatcher.register(action => {
  switch (action.type) {
  case EVENTS.GO_LEFT:
    positionStore.left();
    break;

  case EVENTS.GO_RIGHT:
    positionStore.right();
    break;

  case EVENTS.GO_UP:
    positionStore.up();
    break;

  case EVENTS.GO_DOWN:
    positionStore.down();
    break;

  case EVENTS.UPDATE_GRID:
    positionStore.updateGrid(action.grid);
    break;

  case EVENTS.RESET:
    positionStore.reset();
    break;

  default:
    // no op
  }
});

export default positionStore;
