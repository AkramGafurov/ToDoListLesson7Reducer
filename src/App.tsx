import './App.css';
import {Todolist} from "./Todolist";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./tasksReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [state, dispatch] = useReducer(tasksReducer, [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(taskId))
    }

    const addTask = (title: string) => {
        dispatch(AddTaskAC(title))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC(taskId, taskStatus))
    }

    let tasksForTodolist = state
    if (filter === 'active') {
        tasksForTodolist = state.filter(task => !task.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = state.filter(task => task.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
