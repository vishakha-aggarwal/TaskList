import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Todos from './components/Todos';
const api_base = "http://localhost:5000";

function App(){

  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(api_base + '/api/todos')
			.then(res => res.json())
			.then((data) => { 
        data.map((val, idx) => {
          setList((oldList) => {
            return [...oldList, {task: val.task, id: val._id}];
          })
        })
      })
      .catch((err) => console.error("not connected"));
    }
    
  return (
    <div>
      <Header />
      <Todos hook1 = {[item, setItem]} hook2 = {[list, setList]}/>
      <Footer />
    </div>
  )
}
export default App;