import React, {ChangeEvent, useState} from 'react';
import internal from "stream";

type EditableSpanPropsType = {
    title: string
    callBack: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)
    console.log(newTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler =() => {
        setEdit(true)
    }

    const onBlurHandler = () => {
        props.callBack(newTitle)
        setEdit(false)
    }

    return (
        edit
            ? <input value = {newTitle} autoFocus={true} onBlur={onBlurHandler} onChange={onChangeHandler}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

