import React from "react";

type PropsType = {
    title: string
    title2?: string  // ? - значит что пропс может и не прийти.
}


export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <h5>{props.title2}</h5>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                <li><input type="checkbox" checked={false}/> <span>React</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}
