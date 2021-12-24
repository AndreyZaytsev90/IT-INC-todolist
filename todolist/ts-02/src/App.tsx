import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

//CRUD (сокр. от англ. create, read, update, delete — «создать, прочесть, обновить, удалить»)
function App() {
    //BLL :
    const todoListTitle: string = "What to learn"

    const [filter, setFilter] = useState<FilterValuesType>("all")
        // set - установить, установка.     Set ставиться перед стэйтом(filter  в данном случаее) по соглашению рпзрпботчиков

    const [tasks, setTasks] = useState<Array<TaskType>>([ // в консоли будет 0 (изначальные данные) и 1 - функция
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Redux", isDone: true},
        {id: 5, title: "Angular/Vue", isDone: false},
    ])
    //  console.log(result)
    /* const tasks = result[0] // изначальные данные (все что угодно)
     const setTasks = result[1] */// функция


    /*let tasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Angular/Vue", isDone: false},
    ]*/

    const changeFilter = (filter: FilterValuesType) => setFilter(filter)


    const removeTask = (id: number) => { //2
        // const filteredTasks: Array<TaskType> = tasks.filter(task => task.id !== id)  // можно через .forEach. Можно удалить переменную filteredTasks и tasks.filter(task => task.id !== id) сразу в setTasks
        // return undefined - по умолчанию
        setTasks(tasks.filter(task => task.id !== id))
        // console.log(tasks)
    }


    /* let tasksForRender = tasks;
     if (filter === "active") {
         tasksForRender = tasks.filter(task => !task.isDone)
     }
     if (filter === "completed") {
         tasksForRender = tasks.filter(task => task.isDone)
     }*/

    const getTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks
        }
    }

    //UI:
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={todoListTitle}
                tasks={getTasksForRender()}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
