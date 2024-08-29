import {useReducer, useState} from "react";
import {v1} from "uuid";
// import {TaskType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ActionType = RemoveTaskACType | AddTaskACType | changeTaskStatusACType

export const tasksReducer = (state: any, action: ActionType): Array<TaskType> => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return [...state].filter(task => task.id != action.payload.tasksId)
        }

        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return [newTask, ...state]
        }

        case 'CHANGE-TASK-STATUS': {
            return state.map((t: TaskType) => t.id == action.payload.taskId ? {
                ...t,
                isDone: action.payload.taskStatus
            } : t)
        }
        default:
            return state
    }
}


type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (tasksId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            tasksId
        }
    } as const
}

export  type AddTaskACType = ReturnType<typeof AddTaskAC>

export const AddTaskAC = (newTitle: string) => {
    return {type: 'ADD-TASK', payload: {newTitle}} as const
}

export  type  changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, taskStatus}} as const
}


console.log(removeTaskAC)

