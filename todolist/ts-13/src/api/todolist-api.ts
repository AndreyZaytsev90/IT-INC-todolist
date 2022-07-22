import axios from "axios";

/*const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '4d9e067b-1f99-4fed-a5de-f6400ebdb5d8'
  }
}*/

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    'API-KEY': '4d9e067b-1f99-4fed-a5de-f6400ebdb5d8'
  }
})

export const todolistAPI = {
  updateTodolist: (todolistId: string, title: string) => {
    const promise = instance.put<BaseTodolistType>(`todo-lists/${todolistId}`, {title: title})
    return promise
  },
  createTodolist: (title: string) => {
    return instance.post<BaseTodolistType<{item: TodolistType}>>('todo-lists', {title})
  },
  deleteTodolist: (todolistId: string) => {
    return instance.delete<BaseTodolistType>(`todo-lists/${todolistId}`)
  },
  getTodolist: () => {
    return instance.get<TodolistType[]>("todo-lists")
  }
}

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}
type BaseTodolistType<T = {}> = {
  resultCode: number
  fieldsError: string[]
  messages: string[],
  data: T
}

/*
type CreateTodolistType = {
  resultCode: number
  fieldsError: string[]
  messages: string[],
  data: {
    item: TodolistType
  }
}*/
