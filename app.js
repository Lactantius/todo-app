"use strict";
// Initialize
const tasks = getTasks();
refreshTasks();
// Form for adding tasks
document.querySelector('#add-task').addEventListener('submit', addTaskHandler);
function addTaskHandler(event) {
    event.preventDefault();
    const newTaskInput = document.querySelector('#task-name');
    const newTask = {
        name: newTaskInput.value,
        completed: false,
        id: Date.now()
    };
    tasks.push(newTask);
    refreshTasks();
}
// For removing or completing tasks
document.querySelector('#task-list').addEventListener('click', taskEditHandler);
function taskEditHandler(event) {
    const target = event.target;
    const taskLi = target.parentElement;
    const taskIndex = tasks.findIndex(task => task.id === +taskLi.id);
    if (target.id === 'delete-btn') {
        tasks.splice(taskIndex, 1);
        refreshTasks();
    }
    else if (target.id === 'complete-btn') {
        tasks[taskIndex].completed = true;
        refreshTasks();
    }
}
function getTasks() {
    if (!localStorage.tasks) {
        return [];
    }
    else {
        return JSON.parse(localStorage.tasks);
    }
}
function refreshTasks() {
    localStorage.tasks = JSON.stringify(tasks);
    const taskList = document.querySelector('#task-list');
    taskList.replaceChildren('');
    tasks.forEach(function (task) {
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
        }
        else {
            taskLi.classList.add('completed');
        }
        taskList.append(taskLi);
    });
}
