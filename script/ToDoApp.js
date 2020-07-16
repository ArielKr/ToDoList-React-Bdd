import React,{useState} from 'react';
import ToDo from './ToDo'

const ToDoApp = (props) => {
    const [showDone,setShowDone] = useState(false);
    
    const [data,setData] = useState(props.data?props.data:[]);
    const todosDisplayList = showDone? data : data.filter(todo => todo.done !== true);
    const changeDone = (i,todo) => {
        console.log(i,todo)
        data[i] = todo;
        setData([...data]);
    }
    const addToDo = () => {
        setData([...data,{title:"New ToDo", done: false}]);
    }
    return (
        <>
            <h1>TDD ToDo</h1>
            <div>
                <input type="checkbox"  id="done" onChange={() => {setShowDone(!showDone)}} checked={showDone}/>
                <label htmlFor="done">Show done</label>
            </div>
            <div>
                {data.map((todo,i)=> {
                    if(showDone || todo.done !== true) return <ToDo key={i} todo={todo} changeDone={(todo)=>{changeDone(i,todo)}}/>
                    return <></>
                })}
            </div>
            <input type="button" onClick={() => addToDo()} aria-label="AddToDo" value="New ToDo" />
        </>
    )
}

export default ToDoApp;