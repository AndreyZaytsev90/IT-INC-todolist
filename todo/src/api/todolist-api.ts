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
  items: T
}

export type D = {
  item: TodolistType
}

export type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
}


/*export type ResponseTaskType<T> = {
  data: T;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  resultCode: number;
}*/

export type T = {
  items: TaskType;
}

export type TaskType = {
  id: string;
  title: string;
  todolistId: string;
  order: number;
  status: number;
  priority: number;
  addedDate: Date
}

export const todolistAPI = {
  //Todolists
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

  //Tasks
  getTasks(todolistId: string) {
    const promise = instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
    return promise
  },
  createTask(todolistId: string, title: string) {
    return instance.post(`todo-lists/${todolistId}/tasks`, {title: title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, title: string) {
    return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
  }
}
