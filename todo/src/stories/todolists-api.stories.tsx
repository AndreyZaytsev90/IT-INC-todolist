import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
  title: 'Todolist/API'
}


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTodolist("TODOLIST-4")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '3457fbb9-4c4d-4b4c-b9cc-852e2e55549f'
    todolistAPI.deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'ee887034-a49e-4498-9c03-05bda0100281'
    todolistAPI.updateTodolist(todolistId, "Renault Fluence")
      .then((res) => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

