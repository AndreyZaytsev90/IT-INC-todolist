import React from 'react';
import {TaskType} from "./Todolist";
import style from './Todolist.module.css'


type TaskMapProspType = {
    tasks: Array<TaskType>
    onChangeCheckBox: (tID: string, checked: boolean) => void
    onClickHandler : (tID: string) => void
}

export const TaskMap = ({tasks, onChangeCheckBox, onClickHandler, ...props }: TaskMapProspType) => {
    return (
            <ul>
                {
                    tasks.map(t => {
                        return <li key={t.id} className={t.isDone ? style.isDone : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={ (event) => onChangeCheckBox (t.id, event.currentTarget.checked)}/>
                            <span>{t.title}</span>
                            <button onClick={ (event) => onClickHandler(t.id) }>x</button>
                        </li>
                    })
                }
            </ul>
    );
};

