"use strict";

// Initialize
const tasks = getTasks();
refreshTasks();

// Form for adding tasks
document.querySelector('#add-task').addEventListener('submit', addTaskHandler);

function addTaskHandler(event: SubmitEvent) {

    event.preventDefault();

    const newTaskInput = document.querySelector('#task-name') as HTMLInputElement;

    const newTask: Task = {
        name: newTaskInput.value,
        completed: false,
        id: Date.now()
    }

    tasks.push(newTask);

    refreshTasks();

}

// For removing or completing tasks
document.querySelector('#task-list').addEventListener('click', taskEditHandler);

function taskEditHandler(event: PointerEvent) {

    const target = event.target as HTMLElement;
    const taskLi = target.parentElement;
    const taskIndex = tasks.findIndex(task => task.id === +taskLi.id)

    if (target.id === 'delete-btn') {
        tasks.splice(taskIndex, 1);
        refreshTasks();
    } else if (target.id === 'complete-btn') {
        tasks[taskIndex].completed = true;
        refreshTasks();
    }
}

// Helpers
interface Task {
    name: string;
    completed: boolean;
    id: number;
}

function getTasks(): Task[] {
    if (!localStorage.tasks) {
        return [];
    } else {
        return JSON.parse(localStorage.tasks)
    }
}

function refreshTasks() {

    localStorage.tasks = JSON.stringify(tasks);

    const taskList = document.querySelector('#task-list');
    taskList.replaceChildren('');

    tasks.forEach(function(task) {

        // Make elements
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "Delete";
        deleteButton.id = "delete-btn";

        const completeButton = document.createElement('button');
        completeButton.innerText = "Complete";
        completeButton.id = "complete-btn";

        const taskLi = document.createElement('li');
        taskLi.innerText = task.name;
        taskLi.id = String(task.id);

        // Include elements
        taskLi.append(deleteButton);
        if (task.completed === false) {
            taskLi.append(completeButton);
        } else {
            taskLi.classList.add('completed');
        }
        taskList.append(taskLi);
    })
}
