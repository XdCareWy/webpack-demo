export function startApi(payload = false) {
  return {
    type: 'LOADING',
    payload: payload,
  };
}
export function successApi(payload = {}) {
  return {
    type: 'LIST',
    payload: payload,
  };
}
