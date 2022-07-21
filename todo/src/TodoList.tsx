import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TasksPropsType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (filter: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
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

  const onChangeTodolistTitleHandler = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={props.title} onChange={onChangeTodolistTitleHandler}/>
        {/*<button onClick={removeTodolistHandler}>X</button>*/}
        <IconButton onClick={removeTodolistHandler}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskTitle}/>
      <div>
        {props.tasks.map(task => {

          const onClickRemoveTaskHandler = () => props.removeTask(task.id, props.id)

          const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked
            props.changeTaskStatus(props.id, task.id, newIsDoneValue)
          }
          const onChangeTaskTitleHandler = (newTitle: string) => {
            props.changeTaskTitle(props.id, task.id, newTitle)
          }

          return (
            <div key={task.id} className={task.isDone ? "is-done" : ""}>
              <Checkbox
                checked={task.isDone}
                color='primary'
                onChange={onChangeHandler}/>

              <EditableSpan value={task.title} onChange={onChangeTaskTitleHandler}/>

              <IconButton onClick={onClickRemoveTaskHandler}>
                <Delete/>
              </IconButton>
            </div>
          )
        })}
      </div>
      <div>
        <Button
          onClick={onAllChangeFilter}
          color='secondary'
          variant={props.filter === "all" ? "outlined" : 'text'}>All</Button>
        <Button
          onClick={onActiveChangeFilter}
          color='primary'
          variant={props.filter === "active" ? "outlined" : 'text'}>Active</Button>
        <Button
          onClick={onCompletedChangeFilter}
          color='success'
          variant={props.filter === "completed" ? "outlined" : 'text'}>Completed</Button>
      </div>
    </div>
  );
};

export default TodoList;