export function percent(value) {
  return `${ value }%`;
}

export function px(value) {
  return `${ value }px`;
}

export function times(n, cb) {
  const arr = [];
  let result;
  for (let i = 0; i < n; i++) {
    result = cb(i);
    if (result) {
      arr.push(result);
    }
  }
  return arr;
}

export function toNumber(input, defaultValue) {
  const value = input || defaultValue;
  return parseFloat(value, 10);
}
