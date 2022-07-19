import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: Array<TasksPropsType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: string
}

type TasksPropsType = {
  id: string
  title: string
  isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addTask = () => {
    if (title.trim() !== "") {
      props.addTask(title.trim())
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (event.key === "Enter") {
      addTask()
    }
  }

  const onAllChangeFilter = () => props.changeFilter("all")
  const onActiveChangeFilter = () => props.changeFilter("active")
  const onCompletedChangeFilter = () => props.changeFilter("completed")


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? error : ''}
        />
        <button onClick={addTask}>+</button>
        {error ? <div className={"error-message"}>{error}</div>: ''}
      </div>
      <ul>
        {props.tasks.map(task => {

          const onClickHandler = () => props.removeTask(task.id)

          const onChangeHandler = (changeEvent: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = changeEvent.currentTarget.checked
            props.changeTaskStatus(task.id, newIsDoneValue)
          }

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
              <span>{task.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button className={props.filter === "all"? "active-filter" : ''} onClick={onAllChangeFilter}>All</button>
        <button className={props.filter === "active"? "active-filter" : ''} onClick={onActiveChangeFilter}>Active</button>
        <button className={props.filter === "completed"? "active-filter" : ''} onClick={onCompletedChangeFilter}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;