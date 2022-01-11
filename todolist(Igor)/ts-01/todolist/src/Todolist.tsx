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
    filteredTasks: (valueFilter: FilterType) => void
}

export function Todolist(props: PropsType) {
    const [filterValue, setFilterValue] =useState<FilterType>("All")

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
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {props.tasks.map((value, index) => {
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
            <button onClick={() =>props.filteredTasks("All")}>All</button>
            <button onClick={() =>props.filteredTasks("Active")}>Active</button>
            <button onClick={() =>props.filteredTasks("Completed")}>Completed</button>
        </div>
    </div>
}
