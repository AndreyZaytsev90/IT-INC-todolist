import {TasksStateType} from "../App";
import {v1} from "uuid";

/*type ActionType = {
  type: string
  [key]: any
}*/

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state


export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            /*let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
            tasks[todolistId] = todolistTasks.filter(task => task.id !== taskId) // перезапишем в этом объекте массив для нужного тудулиста с отфильтрованным массивом
            setTasks({...tasks})*/
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            /* let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
             tasks[todolistId] = [task, ...todolistTasks] // перезапишим в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску
             setTasks({...tasks}) // заcетаем в стейт копию объекта, чтобы React отреагировал перерисовкой*/
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            /*let todolistTasks = tasks[todolistId] // достанем нужный массив по todolistId
                let task = todolistTasks.find(task => task.id === taskId) // найдем нужную таску
                if (task) { // изменим таску, если она нашлась
                  task.isDone = isDone
                  setTasks({...tasks}) */
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task
                )
            }
        case 'CHANGE-TASK-TITLE':
          /*  let todolistTasks = tasks[todolistId]
            let task = todolistTasks.find(task => task.id === taskId)
            if (task) { // изменим таску, если она нашлась
                task.title = newTitle
                setTasks({...tasks})*/
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.newTaskTitle}
                        : task
                )
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}


type TasksReducerType = RemoveTaskType | AddTaskType | ChangeTaskTitleType | ChangeTaskStatusType


type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {taskId, todolistId}
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todolistId}
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, isDone, todolistId}
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {todolistId, taskId, newTaskTitle}
    } as const
}

