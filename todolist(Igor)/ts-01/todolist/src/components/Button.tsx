import React from 'react';


type ButtonType = {
    name: string
    callback: () => void
}

const Button = (props: ButtonType) => {

    const onCkickHandler = () => {
        props.callback()
    }

    return (
        <button onClick={onCkickHandler}>{props.name}</button>
    );
};

export default Button;


