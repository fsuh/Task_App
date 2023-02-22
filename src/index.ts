import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string;
  title: string;
  taskDesc: string;
  completed: boolean;
  dueDate: string;
  dueTime: string;
};

// interface HTMLEvent extends Event {
//   target: HTMLElement;
// }

const form = document.querySelector<HTMLFormElement>("form")!;
const taskInput = document.querySelector("#task_input")! as HTMLInputElement;
const dueDate = document.querySelector<HTMLInputElement>("#task_date")!;
const endTime = document.querySelector<HTMLInputElement>("#dueTime")!;
const desText = document.querySelector(
  "#task_Description"
)! as HTMLInputElement;
const list = document.querySelector<HTMLUListElement>(".task_list")!;

const taskArray: Task[] = loadTask();
taskArray.forEach(todoList);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask: Task = {
    id: uuidV4(),
    title: taskInput.value,
    taskDesc: desText.value,
    completed: false,
    dueDate: dueDate.value,
    dueTime: endTime.value,
  };
  taskArray.push(newTask);

  todoList(newTask);
  form.reset();
});

function todoList(task: Task) {
  const taskList = document.createElement("ol");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
    if (checkbox.checked) {
      label.style.setProperty("text-decoration", "line-through");
      label.style.setProperty("color", "red");
    }
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  const description = document.createElement("p");
  const nodeDes = document.createTextNode("Description:");
  const dueDate = document.createElement("p");
  const span = document.createElement("p");
  span.innerHTML = `<i onClick="editTask(this)" class="fa-solid fa-pencil"><span class="tooltiptext">edit</span></i>    
                <i onClick="deleteTask(this); DisplayTask()" class="fa-solid fa-trash-can"><span class="tooltiptext">delete</span></i>`;
  const nodeDueDate = document.createTextNode("Due on:");
  description.append(nodeDes, task.taskDesc);
  dueDate.append(nodeDueDate, task.dueDate, " ", task.dueTime);
  dueDate.appendChild(span);
  description.appendChild(dueDate);
  label.appendChild(description);
  taskList.append(label);
  list.append(taskList);
}

function saveTasks() {
  localStorage.setItem("TASKARRAY", JSON.stringify(taskArray));
}

function loadTask(): Task[] {
  const taskJSON = localStorage.getItem("TASKARRAY");
  if (taskJSON === null) return [];
  return JSON.parse(taskJSON);
}

// const taskData = (newTask: Task) => {
//   taskArray.push(newTask);
//   window.localStorage.setItem("taskArray", JSON.stringify(taskArray));
//   displayTask();
// };

// const displayTask = () => {
//   list.innerHTML = "";
//   let getData: object = JSON.parse(
//     window.localStorage.getItem("taskArray") ?? ""
//   );
//   console.log(getData);

// data.map((todo) => {
//   return (list.innerHTML += `
//   <li>
//           <span>Task is:${todo.title}</span>
//           <span>Due on: ${todo.date}, </span>
//           <span>From: ${todo.start}, </span>
//           <span>to: ${todo.end}</span>
//           <p>Details: ${todo.taskDes}</p>

//           <span class='icons'>
//               <i onClick="editTask(this)" class="fa-solid fa-pencil"><span class="tooltiptext">edit</span></i>
//               <i onClick="deleteTask(this); DisplayTask()" class="fa-solid fa-trash-can"><span class="tooltiptext">delete</span></i>
//           </span>
//       </li>

//   `);
// });
