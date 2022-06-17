"use strict";

// Initialize
const tasks = getTasks();
refreshTasks();

// Form for adding tasks
(document.querySelector("#add-task") as HTMLFormElement).addEventListener(
  "submit",
  addTaskHandler
);

function addTaskHandler(event: SubmitEvent): void {
  event.preventDefault();

  const newTaskInput = document.querySelector("#task-name") as HTMLInputElement;

  const newTask: Task = {
    name: newTaskInput.value,
    completed: false,
    id: Date.now(),
  };

  tasks.push(newTask);

  refreshTasks();
}

// For removing or completing tasks
(document.querySelector("#task-list") as HTMLUListElement).addEventListener(
  "click",
  taskEditHandler
);

function taskEditHandler(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const taskLi = target.parentElement as HTMLLIElement;
  const taskIndex = tasks.findIndex((task) => task.id === +taskLi.id);

  if (target.classList.contains("delete-btn")) {
    tasks.splice(taskIndex, 1);
    refreshTasks();
  } else if (target.classList.contains("complete-btn")) {
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
    return JSON.parse(localStorage.tasks);
  }
}

function refreshTasks(): void {
  localStorage.tasks = JSON.stringify(tasks);

  const taskList = document.querySelector("#task-list") as HTMLUListElement;
  taskList.replaceChildren("");

  tasks.forEach((task): void => {
    // Make elements
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add("delete-btn");

    const completeButton = document.createElement("button");
    completeButton.innerText = "Complete";
    completeButton.classList.add("complete-btn");

    const taskLi = document.createElement("li");
    taskLi.innerText = task.name;
    taskLi.id = String(task.id);

    // Include elements
    taskLi.append(deleteButton);
    if (task.completed === false) {
      taskLi.append(completeButton);
      taskList.prepend(taskLi);
    } else {
      taskLi.classList.add("completed");
      taskList.append(taskLi);
    }
  });
}
