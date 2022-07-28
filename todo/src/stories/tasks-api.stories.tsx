import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/task-api";

export default {
  title: 'Tasks/API'
}


export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    taskAPI.getTasks()
      .then((res) => {
        setState(res.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    taskAPI.createTask("TASK-2")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const taskId = ''
    taskAPI.deleteTask(taskId)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const taskId = 'f258b36d-7c5e-4571-9cd4-7b7dbca85db6'
    taskAPI.updateTask(taskId, "TASK-3")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

