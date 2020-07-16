import React,{useState} from 'react';

const ToDo = (props) => {
    const [todoTitle,setTodoTitle] = useState(props.todo.title);
    const [editMode, setEditMode] = useState(false);
    const done = ()=>{
        props.changeDone({title: todoTitle, done: props.todo.done});
        setEditMode(false);
    }
    const handleChange =(event) => {
        setTodoTitle(event.target.value);
    }
    const changeToDoDone = () => {
        props.changeDone({title: props.todo.title, done:!props.todo.done})
    }
    if(editMode) return(
        <p>
            <input type="text" value={todoTitle} onChange={(event) => {handleChange(event)}} />
            <input type="button" onClick={() => done()} aria-label="done" value="Done" />
            <input type="button" onClick={() => setEditMode(false)} aria-label="cancel" value="Cancel" />
        </p>);
    return(
        <p>
            <input type="checkbox" id={todoTitle} checked={props.todo.done} onChange={()=>{changeToDoDone()}} />
            <label htmlFor={props.todo.title}>{props.todo.title}</label>
            <input type="button" onClick={() => setEditMode(true)} aria-label="edit" value="Edit" />
        </p>
    
    )
}

export default ToDo