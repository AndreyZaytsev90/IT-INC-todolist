import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {combineReducers, createStore} from 'redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({ // результат работы функции combineReducers - это возврат функциц, результатом которой является св-во state в объекте store c св-вами tasks и todolists
    tasks: tasksReducer, // значением сво-ва tasks будет результат работы tasksReducer
    todolists: todolistsReducer // -//-
})
// непосредственно создаём store
export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;


//результат работы createStore
/*
{
    state: {
        tasks: {}
        todolists: {}
    }
    getState()
    dispatch()

}*/
