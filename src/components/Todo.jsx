import React from 'react';
import '../style.css';
const api_base = "http://localhost:5000";

function delTodo(id, [list, setList]){
  
  setList((oldList) => {
    return oldList.filter((ele, idx) =>{
      if(ele.id === id)
      {
        fetch(api_base + '/api/todos/delete/' + id, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id })
        })
          .catch((err) => console.error("Not connected"));  
      }

      return ele.id !== id;
    });
  })
}

function Todo(props){
  return (
    <div className='todo' id = {props.id}>
      <div className='heading'>{props.task}</div>
      <button className='del' onClick={() => delTodo(props.id, props.list)}>X</button>
    </div>
)}
export default Todo;