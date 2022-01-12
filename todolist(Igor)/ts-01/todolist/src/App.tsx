import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])//rcv123 - ячейка памяти
    /* useState = массив
        [tasks, setTasks] - tasks - свойство, setTasks - метод*/
    const removeTask = (id: number) => {
        /*tasks = tasks.filter(value=>value.id !== id)  //rcv124 ячейка памяти изменилась с помощью setTasks
        setTasks(tasks)*/
        setTasks(tasks.filter(value=>value.id !== id))
    }

   /* const [filterValue, setFilterValue] =useState<FilterType>("All")

    let isDoneTrue = tasks
    if (filterValue === "Active") {
        isDoneTrue = tasks.filter(value => value.isDone)
    }
    if (filterValue === "Completed") {
        isDoneTrue = tasks.filter(value => !value.isDone)
    }

    const filteredTasks=(valueFilter: FilterType) => {
        setFilterValue(valueFilter)
        // если 'all' - то дай все
        // если 'Active' - то дай активные
        // если 'Completed' - то дай завершенные
    }*/
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                     // filteredTasks={filteredTasks}
            />
        </div>
    );
}

export default App;
