import React from "react";

type PropsType = {
    title: string
    title2?: string  // ? - значит что пропс может и не прийти.
    task: Array<inArray>
}

type inArray = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(item => { // item - один обьект из массива
                    debugger
                    return (
                        <li key={item.id}><input type="checkbox" checked={item.isDone}/> <span>{item.title}</span></li>
                    )
                })}
               {/* <li><input type="checkbox" checked={props.task[0].isDone}/> <span>{props.task[0].title}</span></li>
                <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>
                <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}