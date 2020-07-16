import React from 'react';
import ReactDom from 'react-dom';
import ToMe from './ToDo';
import ToDoApp from './ToDoApp';

const data = [{title:'item one',done: false},{title:'item two', done:false},{title:'done item', done:true}]
ReactDom.render(
    <ToDoApp data={data} />,
    document.querySelector('#root')
)
