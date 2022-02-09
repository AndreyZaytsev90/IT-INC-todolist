import React from 'react';
import {FilterValuesType} from "../App";


type ButtonPropsType = {
    callBack: () => void
    name: string
    filter: FilterValuesType
}

export const Button = (props: ButtonPropsType) => {

    const onClickHandler = () => {
        props.callBack
    }

    return (
            <button className={props.filter == props.name ? "active-filter" : ""}
                    onClick={onClickHandler}>{props.name}
            </button>
    );
};

