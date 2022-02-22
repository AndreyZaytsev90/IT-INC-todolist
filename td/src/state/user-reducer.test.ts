import {changeNameAC, incrementAgeAC, incrementChildrenAC, userReducer} from './user-reducer';

test.skip('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

   // const endState = userReducer(startState, { type: 'INCREMENT-AGE' })
   const endState = userReducer(startState, incrementAgeAC())

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test.skip('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    const endState = userReducer(startState, incrementChildrenAC())

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

test.skip('user reducer should change name of user', () => {
    const startState = { name: 'Dimych', age: 20, childrenCount: 2 };
    const newName = 'Viktor';
    const endState = userReducer(startState, changeNameAC(newName))

    expect(endState.name).toBe(newName);
});
