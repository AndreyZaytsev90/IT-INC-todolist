import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksPropsType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TasksPropsType>
}

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ]
  })

  //Tasks
  const removeTask = (taskId: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
    tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId) // перезапишим в этом объекте массив для нужного тудулиста с отфильтрованным массивом
    setTasks({...tasks})
  }
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = filter
      setTodolists([...todolists])
    }
  }
  const addTask = (title: string, todolistId: string) => {
    const task = {id: v1(), title: title, isDone: false}
    let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
    tasks[todolistId] = [task, ...todolistTasks] // перезапишим в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску
    setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
  }
  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
    let task = todolistTasks.find(task => task.id === taskId) // найдем нужную таску
    if (task) { // изменим таску, если она нашлась
      task.isDone = isDone
      setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
    }
  }

  //TodoLists
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId)) // добавим в стейт список тудулистов, id которых не равны тому, который нужно удалить
    delete tasks[todolistId] // удалим таски для этого тудулиста из второго стэйта, где мы отдельно храним таски
    setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
  }

  return (
    <div className="App">
      {
        todolists.map((todolist) => {
          let allTodolistTasks = tasks[todolist.id]
          let taskForTodoList = allTodolistTasks // в переменную tasksForTodolists копируем все наши таски

          if (todolist.filter === "active") {
            taskForTodoList = allTodolistTasks.filter(task => !task.isDone)
          }
          if (todolist.filter === "completed") {
            taskForTodoList = allTodolistTasks.filter(task => task.isDone)
          }
          return (
            <TodoList key={todolist.id}
                      id={todolist.id}
                      title={todolist.title}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      removeTodolist={removeTodolist}
                      filter={todolist.filter}/>
          )
        })}
    </div>
  );
}

export default App;
