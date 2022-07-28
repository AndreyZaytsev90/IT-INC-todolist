import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  todolistId: string
  title: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}

type ActionsType = RemoveTaskActionType
  | ChangeTaskStatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodosType
  | SetTasksActionType
  | AddTaskType
  | ChangeTaskTitleActionType
// ChangeTaskTitleType

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    case "SET-TODOS" : {
      const stateCopy = {...state}
      action.todos.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type AddTaskType = ReturnType<typeof addTaskAC>


export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        const action = setTasksAC(tasks, todolistId)
        dispatch(action)
      })
  }
}

export const removeTasksTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
  try {
    const response = await todolistsAPI.deleteTask(todolistId, taskId)
    if (response.data.resultCode === 0) {
      dispatch(removeTaskAC(taskId, todolistId))
    }
  } catch (e) {
  }
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTask(todolistId, title)
    .then(res => {
      dispatch(addTaskAC(res.data.data.item))
    })
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string ) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

  const task = getState().tasks[todolistId].find((el) => el.id === taskId)
  if (task) {
    const model: UpdateTaskModelType = {
      title: task!.title,
      status: status,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      startDate: task.startDate
    }
    todolistsAPI.updateTask(todolistId, taskId, model)
      .then((res) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
      })
  }

}