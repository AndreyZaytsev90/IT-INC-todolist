import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type FullInputPropsType = {
    addTask: (title: string) => void
}



const FullInput = (props: FullInputPropsType) => {
    let [title, setTitle] = useState("")
   /* const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }*/
    /*const addTask = () => {
        props.addTask(title);
        setTitle("");
    }*/
    return (
        <div>
               {/* <input value={title}
                       onChange={ onChangeHandler }
                       onKeyPress={ onKeyPressHandler }
                />*/}
                {/*<button onClick={addTask}>+</button>*/}
        </div>
    );
};

export default FullInput;