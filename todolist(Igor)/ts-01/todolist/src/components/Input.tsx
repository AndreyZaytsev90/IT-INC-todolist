import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    setTitle: (title: string) => void
    title: string
    addTask: (title: string) => void
}

const Input = ({addTask,title,setTitle, ...props}: InputPropsType ) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask(title)
            setTitle("")
        }
    }

    return (

            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />

    );
};

export default Input;