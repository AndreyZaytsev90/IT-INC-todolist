import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: Array<TasksPropsType>
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}

type TasksPropsType = {
  id: string
  title: string
  isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

  let [title, setTitle] = useState("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const addTask = () => {
    props.addTask(title)
    setTitle("")
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
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
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map(task => {

          const onClickHandler = () => props.removeTask(task.id)

          return (
            <li key={task.id}><input type="checkbox" checked={task.isDone}/>
              <span>{task.title}</span>
              <button onClick={onClickHandler}>x</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={onAllChangeFilter}>All</button>
        <button onClick={onActiveChangeFilter}>Active</button>
        <button onClick={onCompletedChangeFilter}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;