import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filter: FilterValuesType
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, newIsDoneValue: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const tasksList = props.tasks.map((task: TaskType) => { //tasks - массив, task - элемент массива
        const removeTask = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={(event) => props.changeTaskStatus(task.id, event.currentTarget.checked)}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>х</button>
            </li>
        )
    })
    const addTask = () => {
        const trimmedTitle = title.trim() // обрезает пробелы по краям названия таски
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        }
        setTitle("")
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                addTask()
            }
    }
    const onClickChangeTitle = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onClickSetAllFilter = () => props.changeFilter("all")
    const onClickSetActiveFilter = () => props.changeFilter("active")
    const onClickSetCompletedFilter = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onClickChangeTitle}
                    onKeyPress={onKeyPressAddTask} // = (event) => onKeyPressAddTask(event)
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={onClickSetAllFilter}>All</button>
                <button onClick={onClickSetActiveFilter}>Active</button>
                <button onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList