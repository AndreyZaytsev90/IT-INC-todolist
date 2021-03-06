import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed";
type todolistsType = {
    id: string,
    title: string
    filter: FilterValuesType

}

function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

   // let [filter, setFilter] = useState<FilterValuesType>("all");
    //console.log(tasks[todolistID2])

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(f=>f.id!==todolistID))
        delete tasks[todolistID]
    }

    function removeTask( todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].filter(f=>f.id !==id)})
     /*   let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
    }

    function addTask(todolistID: string, title: string) {
       let newTask = {id: v1(), title: title, isDone: false};
       setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]] })
       /* let newTasks = [task, ...tasks];
        setTasks(newTasks);*!/*/
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(m=>m.id === taskId ? {...m, isDone} : m)})
    /*    let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);*/
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {

        setTodolists(todolists.map(map=>map.id === todolistID ? {...map,filter: value} : map ))
        console.log(todolists)
    }


    return (
        <div className="App">
            {todolists.map(t => {
                let tasksForTodolist = tasks[t.id];
                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === false);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={t.id}
                        todolistID={t.id}
                        title={t.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={t.filter}
                        removeTodolist={removeTodolist}
                    />
                    )
            })}


        </div>
    );
}

export default App;
