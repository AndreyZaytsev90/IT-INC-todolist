
import {instance} from "./todolist-api";

const todolistId1 = 'faa061cc-fde7-41f6-955e-3eda62b445d4'
const todolistId2 = '469c51c1-6078-4684-93a9-2a6d94d28648'
const todolistId3 = 'b89d8b6b-acb7-465c-8a85-a17592753c75'

/*const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  withCredentials: true,
  headers: {
    // Не забываем заменить API-KEY на собственный
    'API-KEY': 'e63159f0-e2d8-4a94-a54e-dc4334240e6b',
  },
})*/


export const taskAPI = {
  getTasks() {
    const promise = instance.get(`todo-lists/${todolistId1}/tasks`)
    return promise
  },
  createTask(title: string) {
    return instance.post(`todo-lists/${todolistId1}/tasks`, {title: title})
  },
  deleteTask(taskId: string) {
    return instance.delete(`todo-lists/${todolistId1}/tasks/${taskId}`)
  },
  updateTask(taskId: string, title: string) {
    return instance.put(`todo-lists/${todolistId1}/tasks/${taskId}`, {title: title})
  },

}
