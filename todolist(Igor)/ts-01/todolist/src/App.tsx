import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title = {"What to learn"} title2 = {"in React"}/>
            <Todolist title = {"What to buy"} title2 = {"in shop"}/>
        </div>
    )
}

export default App;
