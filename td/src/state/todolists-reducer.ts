import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: todolistsReducerACtype ) => {
    switch (action.type) {
       /* case "CHANGE-FILTER": {
            return state
        }*/
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.payload.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title}: el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }
        default: return state
    }
}

type todolistsReducerACtype = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | changeFilterACType

type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>

export const RemoveTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload : {
            id: todolistId1
        }
    } as const
}

type AddTodolistACType = ReturnType<typeof AddTodolistAC>

export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title}
    } as const
}


type ChangeTodolistTitleACType = ReturnType<typeof ChangeTodolistTitleAC>

export const ChangeTodolistTitleAC = (id: string, title: string ) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}

    } as const
}


type changeFilterACType = {  type: 'CHANGE-TODOLIST-FILTER', id: string, filter:FilterValuesType }

export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}











