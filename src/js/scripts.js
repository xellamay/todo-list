import { v4 as uuid } from 'uuid';

document.addEventListener("DOMContentLoaded", init);

const LSK_TASKS = "tasks";

const tasks = getLocalStorageItems();

const domElements = {
  list: document.querySelector("#list"),
  form: document.forms["create-task-form"],
  input: document.forms["create-task-form"]["name"],
  submitBtn: document.querySelector("#form-submit-btn"),
}

function init() {
  addTaskForm();
  renderTaskList();
}

function renderTaskList() {
  const { list } = domElements;
  list.innerHTML = "";
  if (tasks.length === 0) {
    list.innerHTML = "Список задач пуст";
  } else {
    tasks.forEach((task) => {
      const newNode = createToDoElement(task);
      list.append(newNode);
    })
  }
}

function createToDoElement(task) {
  const node = document.createElement("li");
  node.classList.add("list-item");
  node.innerHTML = `
    <label class="list-item__label">
      <input class="list-item__checkbox" type="checkbox">
        <div class="list-item__text">${task.name}</div>
    </label>
    <button class="list-item__btn-del">-</button>
  `;

  const deleteBtn = node.querySelector(".list-item__btn-del");
  deleteBtn.onclick = () => deleteToDoElement(task);

  const checkbox = node.querySelector(".list-item__checkbox");
  checkbox.onclick = () => doneTask(task);

  if (task.checked) {
    checkbox.checked = true;
    node.classList.add("list-item__text_line");
  }

  return node;
}

function addTaskForm() {
  const { form, input, submitBtn } = domElements;

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    event.stopPropagation();
    tasks.push({
      name: input.value,
      id: uuid(),
      checked: false,
    })
    updateTasks();
    form.reset();
    input.focus();
    submitBtn.disabled = true;
  })

  input.addEventListener("keyup", function() {
    if (input.value) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  })
}

function deleteToDoElement(task) {
  const index = tasks.findIndex(function(el) {
    return el.id === task.id;
  });
  tasks.splice(index, 1);
  updateTasks();
}

function doneTask(task) {
  const index = tasks.findIndex(function(el) {
    return el.id === task.id;
  });
  tasks[index].checked = !tasks[index].checked;
  updateTasks();
}

function getLocalStorageItems() {
  const items = JSON.parse(localStorage.getItem(LSK_TASKS));

  return items || [];
}

function updateLocalStorageItems() {
  localStorage.setItem(LSK_TASKS, JSON.stringify(tasks));
}

function updateTasks() {
  renderTaskList();
  updateLocalStorageItems();
}