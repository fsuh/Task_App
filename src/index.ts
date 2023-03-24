type Task = {
  title: string;
  taskDesc: string;
  completed: boolean;
  dueDate: string;
  dueTime: string;
};

interface TaskListItem extends HTMLOListElement {
  task: Task;
}

const form = document.querySelector<HTMLFormElement>("form")!;
const taskInput = document.querySelector<HTMLInputElement>("#task_input")!;
const dueDate = document.querySelector<HTMLInputElement>("#task_date")!;
const endTime = document.querySelector<HTMLInputElement>("#dueTime")!;
const descriptionInput =
  document.querySelector<HTMLInputElement>("#task_Description")!;
const taskList = document.querySelector<HTMLUListElement>(".task_list")!;

const taskArray: Task[] = loadTask();
taskArray.forEach(addTaskToList);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask: Task = {
    title: taskInput.value,
    taskDesc: descriptionInput.value,
    completed: false,
    dueDate: dueDate.value,
    dueTime: endTime.value,
  };
  taskArray.push(newTask);
  addTaskToList(newTask);
  saveTasks();
  form.reset();
});

function addTaskToList(task: Task) {
  const taskListItem = document.createElement("ol") as TaskListItem;
  taskListItem.task = task;
  const taskListCheckbox = document.createElement("input");
  taskListCheckbox.type = "checkbox";
  taskListCheckbox.checked = task.completed;
  taskListCheckbox.addEventListener("change", () => {
    task.completed = taskListCheckbox.checked;
    saveTasks();
    updateTaskListItem(taskListItem);
  });
  const taskListTitle = document.createElement("span");
  taskListTitle.textContent = task.title;
  const taskDescriptionText = document.createElement("div");
  taskDescriptionText.textContent = ` Description: ${task.taskDesc},`;
  const taskListDueDate = document.createElement("div");
  taskListDueDate.textContent = ` Due date: ${task.dueDate}, Due Time: ${task.dueTime}`;
  const taskListDeleteButton = document.createElement("span");
  taskListDeleteButton.innerHTML = ` <i class="fa-solid fa-trash-can"><span class="tooltiptext">delete</span></i>`;
  taskListDeleteButton.addEventListener("click", () => {
    deleteTask(taskListItem);
  });

  const taskListEditButton = document.createElement("span");
  taskListEditButton.innerHTML = ` <i class="fa-solid fa-pencil"><span class="tooltiptext">edit</span></i>`;
  taskListEditButton.addEventListener("click", () => {
    editTask(taskListItem);
  });

  taskListItem.append(
    taskListCheckbox,
    taskListTitle,
    taskDescriptionText,
    taskListDueDate,
    taskListEditButton,
    taskListDeleteButton
  );
  taskList.appendChild(taskListItem);
}

function updateTaskListItem(taskListItem: TaskListItem) {
  const taskListCheckbox = taskListItem.querySelector<HTMLInputElement>(
    `input[type="checkbox"]`
  )!;
  const taskListTitle = taskListItem.querySelector<HTMLSpanElement>("span")!;
  taskListCheckbox.checked = taskListItem.task.completed;
  taskListTitle.style.textDecoration = taskListItem.task.completed
    ? "line-through"
    : "none";
}

function deleteTask(taskListItem: TaskListItem) {
  const index = taskArray.indexOf(taskListItem.task);
  taskArray.splice(index, 1);
  taskListItem.remove();
  saveTasks;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

function loadTask(): Task[] {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    return JSON.parse(savedTasks);
  } else {
    return [];
  }
}

function editTask(taskListItem: TaskListItem) {
  const task = taskListItem.task;
  taskInput.value = task.title;
  descriptionInput.value = task.taskDesc;
  dueDate.value = task.dueDate;
  endTime.value = task.dueTime;

  deleteTask(taskListItem);
}
