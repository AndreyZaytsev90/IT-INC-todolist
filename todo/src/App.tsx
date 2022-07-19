import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

  let [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
    {id: v1(), title: "graphQL", isDone: false}
  ])
  let [filter, setFilter] = useState<FilterValuesType>("all") // Храним значение для фильтра с помощью useState (ведь мы хотим его при клике на кнопку потом менять и нам надо, чтобы происходила автоматическая перерисовка)

  const removeTask = (taskId: string) => {
    let filteredTasks = tasks.filter(task => task.id !== taskId)
    setTasks(filteredTasks)
  }
  let taskForTodoList = tasks // в переменную tasksForTodolists копируем все наши таски

  if (filter === "active") {
    taskForTodoList = tasks.filter(task => task.isDone === false)
  }
  if (filter === "completed") {
    taskForTodoList = tasks.filter(task => task.isDone === true)
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  const addTask = (title: string) => {
    const newTasks = {id: v1(), title: title, isDone: false}
    setTasks(prev => [...prev, newTasks])
  }


  return (
    <div className="App">
      <TodoList title={"What to learn"}
                tasks={taskForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}/>
    </div>
  );
}

export default App;
