export function increase(payload = 0) {
  return {
    type: 'INCREASE',
    payload: payload,
  };
}
export function decrease(payload = 0) {
  return {
    type: 'DECREASE',
    payload: payload,
  };
}
