import React, { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log(count);
    setCount(count + 1);
  };
  const [user, setUser] = useState({ name: '张三' });
  const handleKeyDown = e => {
    const key = e.keyCode;
    const value = e.target.value;
    if (key === 13) {
      setUser({ name: value });
    }
  };
  return (
    <div>
      <div>
        <div>Your name {user.name}</div>
        <input type="text" onKeyDown={handleKeyDown} />
      </div>
      <p>
        你点击的次数
        {count}
      </p>
      <button onClick={handleClick}>点击</button>
    </div>
  );
}
