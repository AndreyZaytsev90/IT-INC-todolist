import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

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

  const addTaskTitle = (title: string) => {
    props.addTask(title, props.id)
  }

  const onAllChangeFilter = () => props.changeFilter("all", props.id)
  const onActiveChangeFilter = () => props.changeFilter("active", props.id)
  const onCompletedChangeFilter = () => props.changeFilter("completed", props.id)

  const removeTodolistHandler = () => props.removeTodolist(props.id)


  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodolistHandler}>X</button>
      </h3>
      <AddItemForm addItem={addTaskTitle}/>
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