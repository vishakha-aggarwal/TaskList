import React, { useState } from 'react';
import '../style.css';
import  AddTodo from './AddTodo';

function Todos(props){
  
  return (
    <div className = "todos">
      <AddTodo hook1 = {props.hook1} hook2 = {props.hook2}/>
    </div>
)}
export default Todos;