export const DEFAULTS = {
  SIZE: 10,
  HEIGHT: '10%',
  WIDTH: '10%'
};

export const EVENTS = {
  UPDATE_GRID: 'update:grid',
  GO_LEFT: 'go:left',
  GO_RIGHT: 'go:right',
  GO_UP: 'go:up',
  GO_DOWN: 'go:down',
  RESET: 'reset',
  updateBlockEvent(x, y) {
    return `update:block:${ x }:${ y }`;
  }
};
