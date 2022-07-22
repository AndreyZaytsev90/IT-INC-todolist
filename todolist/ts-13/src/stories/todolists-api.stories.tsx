import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'API'
}

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '4d9e067b-1f99-4fed-a5de-f6400ebdb5d8'
  }
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistAPI.getTodolist().then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const title = ''
    todolistAPI.createTodolist(title).then((res) => {
      setState(res.data.data.item)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    const todolistId = 'e5a84f53-0f55-4bdb-9f39-2196e65df845'
    todolistAPI.deleteTodolist(todolistId).then((res)=> {setState(res.data)})
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'REDUX'
    const todolistId = '3c201789-b97d-4e3c-9a73-3d802d11e6f0'

    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data)
    })
    /*const todolistId = 'e5a84f53-0f55-4bdb-9f39-2196e65df845'
    axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'}, settings)
      .then((res) => {
        setState(res.data)
      })*/

  }, [])

  return <div>{JSON.stringify(state)}</div>
}

