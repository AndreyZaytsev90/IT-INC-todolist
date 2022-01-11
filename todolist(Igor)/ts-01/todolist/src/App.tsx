import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const [tasks, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])//rcv123 - ячейка памяти

    const [filterValue, setFilterValue] =useState("all")
    console.log(filterValue)

/*    // если 'Active'
    let isDoneTrue = (tasks.filter(value =>value.isDone === true)) 
    // если 'Completed'
    let isDoneTrue = (tasks.filter(value =>value.isDone === false))*/

    const filteredTasks=(valueFilter: string) => {
        setFilterValue(valueFilter)
        // если 'all' - то дай все
        // если 'Active' - то дай активные
        // если 'Completed' - то дай завершенные
    }

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
                      tasks={tasks}
                      removeTask={removeTask}
                      filteredTasks={filteredTasks}
            />
        </div>
    );
}

export default App;
