import React, {useState} from 'react';
import '../style.css';
import Todo from './Todo';
const api_base = "http://localhost:5000";

function AddTodo(props){
  
  const [item, setItem] = props.hook1;
  const [list, setList] = props.hook2;

    const setTheItem = (e)=>{
      if(e.target.value !== "") {
        setItem(e.target.value);
      }
    }

    const addItem = (e) => {
      fetch(api_base + '/api/todos/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: item })
      })
        .then(res => res.json())
        .then((data) => 
            setList((oldList) => {
              return [...oldList, {task: data.task, id: data._id}];
            })
          )
        .catch((err) => console.error("Not connected"));
        document.getElementsByClassName("inputItem").task.value = "";
      }

    return ( 
      <div>
        <input type = "text" placeholder='Enter the task' name = "task" onChange={setTheItem} className = "inputItem"/>
        <button onClick={addItem} className = "addItem">Done</button>
        {list.map((items, index) =>{
          if(items !== "") 
            return <Todo task = {items.task} key = {index} id = {items.id} list = {[list, setList]} item = {[item, setItem]}/>
        })}

      </div>
)}
export default AddTodo;