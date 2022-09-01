import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b',
  },
})

export type TodolistType = {
  id: string;
  title: string;
  addedDate: Date;
  order: number;
}

export type D = {
  item: TodolistType
}

export type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
}

export const todolistAPI = {
  getTodolists() {
    const promise = instance.get<Array<TodolistType>>('todo-lists')
    return promise
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<D>>('todo-lists', {title: title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
  },

}
