import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import Year from "react-live-clock";
import Month from "react-live-clock";
import Day from "react-live-clock";


const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `남은 항목 수: ${count}개`;
  });

  const [names, setNames] = useState([]);
  //input에 뭐가 있는지 트레킹.
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(0);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  //onAdd를 concat 써서 고치기
  const onAdd = () => {
    const nextData = names.concat({
      id: nextId,
      text: input,
    });

    setNextId(nextId + 1);
    setNames(nextData);
    setCount(count + 1);
    setInput("");
  };

  const onDelete = (id) => {
    const nextData = names.filter((names) => names.id !== id);
    setNames(nextData);
    
    
  };
  //checkbox
  const [isChecked, setIsChecked] = useState(false);

  const onChecked = ({ target }) => {
    setIsChecked(!isChecked);
    checkedHandler(target.parentNode, target.checked);
  };

  const checkedHandler = (box, isChecked) => {
    if (isChecked) {
    //   setCount(count - 1);
      box.style.textDecoration = "line-through";
    } else if (!isChecked) {
    //   setCount(count + 1);
      box.style.textDecoration = "none";
    }
  };

  const todoList = names.map((names) => (
    <div>
      <p className="todo-list-list" key={names.id}>
        <input
          type="checkbox"
          className="todo-checkbox"
          onChange={(e) => onChecked(e)}
        ></input>

        {names.text}
        <button
          className="todo-delete-btn"
          onClick={() => {
            onDelete(names.id);
            setCount(count - 1);
          }}
        >
          [delete]
        </button>
      </p>
    </div>
  ));

  return (
    <div className="todo-list">
      <h1>Todo List ✔
        <div className="todo-date">
      <span>
        <Year
        format={"YYYY"}
        ticking={false}
        timezome={"KR/Pacific"}/>
      </span>.
      <span>
        <Month
        format={"MM"}
        ticking={false}
        timezone={"KR/Pacific"}/>
      </span>.
      <span>
        <Day
        format={"DD"}
        ticking={false}
        timezone={"KR/Pacific"}/>
      </span>
      </div></h1>
      
      <p className="todo-count">남은 항목 수 {count}개</p>

      <div>
        <input
          className="todo-input"
          value={input}
          onChange={onChange}
          placeholder="할 일을 입력하세요."
        ></input>
        <button className="todo-input-btn" onClick={onAdd}>
          add
        </button>
        <div className="todo-list-list">{todoList}</div>
      </div>
    </div>
  );
};

export default Home;
