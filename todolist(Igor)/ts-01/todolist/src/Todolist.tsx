import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean

}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void // функция ни чего не возвращает
}

export function Todolist(props: PropsType) {
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
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
}
