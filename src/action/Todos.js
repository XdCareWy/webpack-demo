export function addTodo(todo) {
  return {
    type: 'ADD',
    payload: todo
  };
}

export function removeTodo(id) {
  return {
    type: 'REMOVE',
    payload: id
  };
}

export function toggleTodo(id) {
  return {
    type: 'CHECKED',
    payload: id
  };
}
