import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])//rcv123 - ячейка памяти
    const removeTask = (id: number) => {
        tasks = tasks.filter(value=>value.id !== id)  //rcv124 ячейка памяти изменилась с помощью setTasks
        setTasks(tasks)
    }
   /* useState = массив
        [tasks, setTasks] - tasks - свойство, setTasks - метод*/
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
