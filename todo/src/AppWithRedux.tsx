import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppHeader} from "./AppHeader";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType} from "./state/tasks-reducer";
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    TodolistsType
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";


function AppWithRedux() {

    const dispatch = useDispatch() //получает action и отправляет в стор
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>( state => state.todolists) // достаем из глобально стэйта масссив тодулистов
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks) // достаем из глобально стэйта таски

    //TodoLists
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
        // dispatchToTasks(action)
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistId, newTitle)
        dispatch(action)
    }
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, filter)
        dispatch(action)
    }
    //Tasks
    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId)
        dispatch(action)
    }
    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        const action = changeTaskTitleAC(todolistId,taskId,newTitle)
        dispatch(action)
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(action)
    }

    return (
        <div className="App">
            <AppHeader/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
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
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList key={todolist.id}
                                              id={todolist.id}
                                              title={todolist.title}
                                              tasks={taskForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeTodolistFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              removeTodolist={removeTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTitle={changeTodolistTitle}
                                              filter={todolist.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
