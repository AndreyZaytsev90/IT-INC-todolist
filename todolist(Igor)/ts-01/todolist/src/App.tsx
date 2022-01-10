import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const [tasks, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])//rcv123 - ячейка памяти

    let isDoneTrue = tasks.filter(value=>value.isDone === true)


    const removeTask = (id: number) => {
        /*tasks = tasks.filter(value=>value.id !== id)  //rcv124 ячейка памяти изменилась с помощью setTasks
        setTasks(tasks)*/
        setTasks(tasks.filter(value=>value.id !== id))
    }
   /* useState = массив
        [tasks, setTasks] - tasks - свойство, setTasks - метод*/
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={isDoneTrue}
                      removeTask={removeTask}

            />
        </div>
    );
}

export default App;
