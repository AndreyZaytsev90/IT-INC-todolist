import {v1} from "uuid";

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistsType>, action: TodolistsReducerType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            /*let newState = [{...state}]
            newState.filter(todolist => todolist.id !== action.payload)*/

            return state.filter(tl => tl.id !== action.payload.todolistId)

        case 'ADD-TODOLIST':
            let newTodoList: TodolistsType = {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: 'all'}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            /*  let todolist = todolists.find(todolist => todolist.id === todolistId)
              if (todolist) {
                todolist.title = newTitle
                setTodolists([...todolists])
              }*/
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, title: action.payload.newTodolistTitle}
                : tl)
        case 'CHANGE-TODOLIST-FILTER':
            /*let todolist = todolists.find(tl => tl.id === todolistId)
            if (todolist) {
              todolist.filter = filter
              setTodolists([...todolists])*/
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, filter: action.payload.newFilter}
                : tl)
        default:
            throw new Error('I don\'t understand this type')
    }
}


export type TodolistsReducerType =
    RemoveTodolistType |
    AddTodoListType |
    ChangeTodolistTitleType |
    ChangeTodolistFilterType

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodoListType = ReturnType<typeof addTodoListAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId: todolistId1}
    } as const
}

export const addTodoListAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistTitle, todolistId: v1()}
    } as const
}

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId: todolistId2, newTodolistTitle}
    } as const
}

export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId: todolistId2, newFilter}
    } as const
}