import React, { useState, useRef } from 'react';
import '../style.css';

export default function Todolist() {
  const [task, setTask] = useState('');
  const [todoArray, settoDoArray] = useState([]);
  const [searchArray, setSearchArray] = useState([]);
  const TextRef = useRef(null);
  let timeOutId = 0;

  const addTask = () => {
    settoDoArray([...todoArray, TextRef.current.value]);
    setTask('');
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
      <h2>Search Task</h2>
      <input onChange={(e) => onSearch(e.target.value)}></input>
      {searchArray.map((res, index) => {
        return <div>{res}</div>;
      })}
      =======================================
      <h2>Add task</h2>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        ref={TextRef}
      ></input>
      <button onClick={addTask} disabled={task == ''}>
        Add
      </button>
      <table>
        <tr>
          <th>Task</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {todoArray.map((res, index) => (
          <tr>
            <td>{res}</td>
            <td>
              {' '}
              <button onClick={() => editTask(index)}> edit</button>
            </td>
            <td>
              {' '}
              <button onClick={() => deleteTask(index)}>delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
