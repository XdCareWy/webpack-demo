import React from 'react';
import { Checkbox } from 'antd';

export const TodoList = ({ list, onChecked, onRemove }) => {
  return list.map(({ id, value, finished }) => (
    <div key={id}>
      <Checkbox checked={finished} onChange={() => onChecked(id)} />
      <Todo value={value} finished={finished} />
      <span onClick={() => onRemove(id)}>X</span>
    </div>
  ));
};

export const Todo = ({ value, finished }) => (
  <span style={{ textDecoration: finished && 'line-through' }}>{value}</span>
);
