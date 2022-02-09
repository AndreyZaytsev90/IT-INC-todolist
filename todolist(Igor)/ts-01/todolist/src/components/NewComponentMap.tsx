import React, {ChangeEvent} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "../Todolist";

export type NewComponentMapPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    editTitleTask:(todolistId: string,taskID:string ,title:string)=>void
    todolistId: string
}

export const NewComponentMap = (props: NewComponentMapPropsType) => {

    const {removeTask, changeTaskStatus, editTitleTask } = props

    const editTitleTaskHandler=(taskID:string ,title:string)=>{
        editTitleTask(props.todolistId,taskID,title)
    }

    return (
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        changeTaskStatus(t.id, newIsDoneValue, props.todolistId);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan title={t.title} callBack={(title)=>editTitleTaskHandler(t.id,title)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
    );
};
