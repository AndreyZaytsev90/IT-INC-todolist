import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolists/Task',
    component: Task,
    args: {
        changeTaskStatus: action ( "changeTaskStatus"),
        changeTaskTitle: action ( "changeTaskTitle"),
        removeTask: action ( "removeTask")
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStoreTrue = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoreTrue.args = {
    task: {id: "12", isDone: true, title: "JS"},
};

export const TaskStoreFalse = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoreFalse.args = {
    task: {id: "12", isDone: false, title: "JS"},
};
