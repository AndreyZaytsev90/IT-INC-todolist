import React, {useState} from 'react';
import {FilterType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean

}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void // функция ни чего не возвращает
    //filteredTasks: (valueFilter: FilterType) => void
}

export function Todolist(props: PropsType) {

    const [filterValue, setFilterValue] =useState<FilterType>("All")

    let isDoneTrue = props.tasks
    if (filterValue === "Active") {
        isDoneTrue = props.tasks.filter(value => value.isDone)
    }
    if (filterValue === "Completed") {
        isDoneTrue = props.tasks.filter(value => !value.isDone)
    }

    const filteredTasks=(valueFilter: FilterType) => {
        setFilterValue(valueFilter)
        // если 'all' - то дай все
        // если 'Active' - то дай активные
        // если 'Completed' - то дай завершенные
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {isDoneTrue.map((value, index) => {
                return (
                    <li key={value.id}>
                        <input type="checkbox" checked={value.isDone}/>
                        <span>{value.title}</span>
                        <button onClick={() => props.removeTask(value.id)}>x</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() =>filteredTasks("All")}>All</button>
            <button onClick={() =>filteredTasks("Active")}>Active</button>
            <button onClick={() =>filteredTasks("Completed")}>Completed</button>
        </div>
    </div>
}
