import React, { useState, useRef } from 'react';
import '../style.css';

export default function Todolist() {
  const [task, setTask] = useState('');
  const [todoArray, settoDoArray] = useState(['aaaaa', 'bbbbb', 'ccccc']);
  const [searchArray, setSearchArray] = useState([]);
  const TextRef = useRef(null);
  let timeOutId = 0;

  const addTask = () => {
    settoDoArray([...todoArray, TextRef.current.value]);
    TextRef.current.value = '';
  };

  const editTask = (Todoindex) => {
    let removedElement;
    let removedTodoArray = todoArray.filter((res, index) => {
      if (index == Todoindex) {
        removedElement = res;
        return false;
      }
      return true;
    });
    settoDoArray(removedTodoArray);
    setTask(removedElement);
  };
  const deleteTask = (Todoindex) => {
    let removedTodoArray = todoArray.filter((res, index) => {
      if (index == Todoindex) {
        return false;
      }
      return true;
    });
    settoDoArray(removedTodoArray);
  };

  const onSearch = (value) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(getSearched(value), 1000);
  };

  const getSearched = (value) => {
    if (value.length > 0) {
      let searchedArr;
      searchedArr = todoArray.filter((res, inded) => {
        if (res.includes(value)) {
          return true;
        }
        return false;
      });
      setSearchArray([...searchedArr]);
    } else {
      setSearchArray([]);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        gap: '20px',
      }}
    >
      <h1>Todo list</h1>
      <h3>Search</h3>
      <input onChange={(e) => onSearch(e.target.value)}></input>
      {searchArray.map((res, index) => {
        return <div>{res}</div>;
      })}
      =======================================
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        ref={TextRef}
      ></input>
      <button onClick={addTask}>Add</button>
      {todoArray.map((res, index) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', gap: '32px' }}>
            {res}

            <button onClick={() => editTask(index)}> edit</button>
            <button onClick={() => deleteTask(index)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
