import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TasksPropsType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (filter: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  removeTodolist: (todolistId: string) => void
  filter: FilterValuesType
}

export type TasksPropsType = {
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
      props.addTask(title.trim(), props.id)
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

  const onAllChangeFilter = () => props.changeFilter("all", props.id)
  const onActiveChangeFilter = () => props.changeFilter("active", props.id)
  const onCompletedChangeFilter = () => props.changeFilter("completed", props.id)

  const removeTodolistHandler = () => props.removeTodolist(props.id)


  return (
    <div>

        <h3>{props.title}<button onClick={removeTodolistHandler}>X</button></h3>

      <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? error : ''}
        />
        <button onClick={addTask}>+</button>
        {error ? <div className={"error-message"}>{error}</div> : ''}
      </div>
      <ul>
        {props.tasks.map(task => {

          const onClickHandler = () => props.removeTask(task.id, props.id)

          const onChangeHandler = (changeEvent: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = changeEvent.currentTarget.checked
            props.changeTaskStatus(props.id, task.id, newIsDoneValue)
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
        <button className={props.filter === "all" ? "active-filter" : ''} onClick={onAllChangeFilter}>All</button>
        <button className={props.filter === "active" ? "active-filter" : ''} onClick={onActiveChangeFilter}>Active
        </button>
        <button className={props.filter === "completed" ? "active-filter" : ''}
                onClick={onCompletedChangeFilter}>Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;