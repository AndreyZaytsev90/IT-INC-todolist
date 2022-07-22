import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

/*type ActionType = {
  type: string
  [key: string]: any
}*/

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state


export const todolistsReducer = (state: Array<TodolistsType>, action: todolistsReducerType) => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      /*let newState = [{...state}]
      newState.filter(todolist => todolist.id !== action.payload)*/

      return state.filter(tl => tl.id !== action.payload.todolistId1)

    case 'ADD-TODOLIST':
      let newTodoListId = v1()
      let newTodoList: TodolistsType = {id: newTodoListId, title: action.payload.newTodolistTitle, filter: 'all'}
      return [...state, newTodoList]
    case 'CHANGE-TODOLIST-TITLE':
      /*  let todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
          todolist.title = newTitle
          setTodolists([...todolists])
        }*/
      return state.map(tl => tl.id === action.payload.todolistId2
        ? {...tl, title: action.payload.newTodolistTitle}
        : tl)
    case 'CHANGE-TODOLIST-FILTER':
      /*let todolist = todolists.find(tl => tl.id === todolistId)
      if (todolist) {
        todolist.filter = filter
        setTodolists([...todolists])*/
      return state.map(tl => tl.id === action.payload.todolistId2
        ? {...tl, filter: action.payload.newFilter}
        : tl)
    default:
      throw new Error('I don\'t understand this type')
  }
}


type todolistsReducerType =
  removeTodolistACType |
  addTodoListACType |
  changeTodolistTitleType |
  changeTodolistFilterType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>
type changeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>


export const removeTodolistAC = (todolistId1: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todolistId1}
  } as const
}

export const addTodoListAC = (newTodolistTitle: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {newTodolistTitle}
  } as const
}

export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {todolistId2, newTodolistTitle}
  } as const
}

export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {todolistId2, newFilter}
  } as const
}