import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';

const Home = () => {
 

    const [count, setCount] = useState(0);

    useEffect(()=>{
        document.title=`남은 할 일 갯수: ${count}개`;
    })

    const [names, setNames] = useState([
        
    ]);
    //input에 뭐가 있는지 트레킹.
    const [input, setInput] = useState('');
    const [nextId, setNextId] = useState(0);

    const onChange=(e)=>{
        setInput(e.target.value);
    };

    //onAdd를 concat 써서 고치기
    const onAdd=()=>{
    const nextData = names.concat({
        id:nextId,
        text:input});

        setNextId(nextId+1);
        setNames(nextData);
        setCount(count+1);
        setInput('');
    };

    const onDelete =(id)=>{
        const nextData = names.filter(names=> names.id !== id);
        setNames(nextData);
    }

    const todoList = names.map(names=> (<div><li className='todo-list-list' key={names.id}>
        {names.text}
        <button className='todo-delete-btn' onClick={()=>{
            onDelete(names.id);
            setCount(count-1);
        }}>[delete]</button>
        </li></div>));
 

    return (
        <div className='todo-list'>
            <h1>Todo List</h1>
            
            <div >

            <input className='todo-input' value={input} onChange={onChange} placeholder='할 일을 입력하세요.'></input>
            <button className='todo-input-btn' onClick={onAdd}>add</button>
            <ul className='todo-list-list' >{todoList}</ul>
            </div>

           
           


        </div>
    );
};

export default Home;