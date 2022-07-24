import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListType, RemoveTodolistType} from "./todolists-reducer";

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state

export const tasksReducer = (state: TasksStateType, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task
                )
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.newTaskTitle}
                        : task
                )
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        case "REMOVE-TODOLIST":
           /* const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId1]
            return stateCopy*/
            let {[action.payload.todolistId1]: [], ...rest} = {...state} // удаление через де структуризацию объекта
            return rest

        default:
            throw new Error('I don\'t understand this type')
    }
}


type TasksReducerType = RemoveTaskType |
    AddTaskType |
    ChangeTaskTitleType |
    ChangeTaskStatusType |
    AddTodoListType |
    RemoveTodolistType


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
