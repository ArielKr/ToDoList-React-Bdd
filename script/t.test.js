import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import ToMe from './ToDo'
import ToDoApp from './ToDoApp'
import ToDo from './ToDo'

describe('it all', () => {
    test('Get the todo title', () => {
        const {container} = render(<ToDoApp />)
        screen.getByText('TDD ToDo');
    })

    test('Get list with two items, show two', () => {
        const data = [{title:'item one'},{title:'item two'}]
        const {container} = render(<ToDoApp data={data}/>);
        expect(container.querySelectorAll('p').length).toBe(2);
        screen.getByText(data[0].title);
        screen.getByText(data[1].title);
    })

    test('Get list with two active items, one done. show the two', () => {
        const data = [{title:'item one',done: false},{title:'item two', done:false},{title:'done item', done:true}]
        const {container} = render(<ToDoApp data={data}/>);
        expect(container.querySelectorAll('p').length).toBe(2);
        screen.getByText(data[0].title);
        expect(screen.queryByText(data[1].title)).toBeInTheDocument();
        expect(screen.queryByText(data[2].title)).not.toBeInTheDocument();
    })

    test('Click the showDone show all three ToDos',() => {
        const data = [{title:'item one',done: false},{title:'item two', done:false},{title:'done item', done:true}]
        const {container} = render(<ToDoApp data={data}/>);
        expect(container.querySelectorAll('p').length).toBe(2);
        screen.getByLabelText('Show done').click();
        expect(container.querySelectorAll('p').length).toBe(3);
        screen.getByLabelText('Show done').click();
        expect(container.querySelectorAll('p').length).toBe(2);
    })

    test('Add done checkbox', () => {
        const data = [{title:'item one',done: false},{title:'item two', done:false},{title:'done item', done:true}]
        const {container} = render(<ToDoApp data={data}/>);
        expect(screen.queryByLabelText(data[0].title)).toBeInTheDocument();
        expect(screen.queryByLabelText(data[0].title)).not.toBeChecked();
        screen.getByLabelText('Show done').click();
        expect(screen.queryByLabelText(data[2].title)).toBeInTheDocument();
        expect(screen.queryByLabelText(data[2].title)).toBeChecked();
    })

    test('Click done removes from todo list', () => {
        const data = [{title:'item one',done: false},{title:'item two', done:false},{title:'done item', done:true}]
        const {container} = render(<ToDoApp data={data}/>);
        expect(container.querySelectorAll('p').length).toBe(2);
        expect(screen.queryByLabelText(data[0].title)).toBeInTheDocument();
        expect(screen.queryByLabelText(data[0].title)).not.toBeChecked();
        screen.queryByLabelText(data[0].title).click();
        expect(container.querySelectorAll('p').length).toBe(1);
        expect(screen.queryByLabelText(data[0].title)).not.toBeInTheDocument();
        screen.getByLabelText('Show done').click();
        expect(container.querySelectorAll('p').length).toBe(3);
        expect(screen.queryByLabelText(data[0].title)).toBeInTheDocument();
        expect(screen.queryByLabelText(data[0].title)).toBeChecked();
        screen.queryByLabelText(data[0].title).click();
        screen.getByLabelText('Show done').click();
        expect(container.querySelectorAll('p').length).toBe(2);
        expect(screen.queryByLabelText(data[0].title)).toBeInTheDocument();
        expect(screen.queryByLabelText(data[2].title)).not.toBeInTheDocument();
    });

    test('Add new ToDo', () => {
        const data = [{title:'item one',done: false},{title:'item two', done:false},{title:'done item', done:true}]
        const {container} = render(<ToDoApp data={data}/>);
        expect(container.querySelectorAll('p').length).toBe(2);
        expect(screen.queryByLabelText("New ToDo")).not.toBeInTheDocument();
        screen.getByRole('button', {name: 'AddToDo'}).click();
        expect(container.querySelectorAll('p').length).toBe(3);
        expect(screen.queryByLabelText("New ToDo")).toBeInTheDocument();
    })
    /////////////////////////////

    test('Test  todo component', () =>{
        const todo = {title:'Some boring todo'};
        const {container} = render(<ToDo todo={todo} />);
        screen.getByText(todo.title)
    });

    test ('On click on todo',()=>{
        const mockOnChange = jest.fn(x => 42 + x);
        const todo = {title:'Some boring todo'};
        const {container} = render(<ToDo todo={todo} changeDone={mockOnChange} />);
        screen.getByText(todo.title);
        expect(mockOnChange).not.toBeCalled();
        screen.queryByLabelText(todo.title).click();
        expect(mockOnChange).toBeCalled();
    });

    test ('EditToDo', () => {
        const mockOnChange = jest.fn(x => 42 + x);
        const todo = {title:'Some boring todo'};
        const {container} = render(<ToDo todo={todo} changeDone={mockOnChange} />);

        expect(screen.queryByLabelText(todo.title)).toBeInTheDocument();
        screen.getByRole('button', {name: 'edit'}).click();
        expect(screen.queryByLabelText(todo.title)).not.toBeInTheDocument();
        screen.getByRole('button', {name: 'cancel'}).click();

        expect(screen.queryByLabelText(todo.title)).toBeInTheDocument();

    })
});