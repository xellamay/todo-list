import { v4 as uuid } from 'uuid';
import TaskListService from "./TaskListService";

document.addEventListener("DOMContentLoaded", init);

const LSK_TASKS = "tasks";

const tasks = getLocalStorageItems();

const filterStateStatus = {
  ALL: "all",
  DONE: "done",
  UNDONE: "undone"
}

let filterState = filterStateStatus.UNDONE;

const domElements = {
  list: document.querySelector("#list"),
  form: document.forms["create-task-form"],
  input: document.forms["create-task-form"]["name"],
  submitBtn: document.querySelector("#form-submit-btn"),
  btnAllTasks: document.querySelector(".button_allTasks"),
  btnDoneTasks: document.querySelector(".button_doneTasks"),
  btnUndoneTasks: document.querySelector(".button_undoneTasks"),
}

const taskListService = new TaskListService(tasks);

function init() {
  addTaskForm();
  renderTaskListByFilter();
}

function renderTaskListByFilter() {
  if (filterState === filterStateStatus.ALL) {
    renderTaskList(taskListService.list);
  }
  if (filterState === filterStateStatus.DONE) {
    const filteredTask = taskListService.list.filter(filterByDone);
    renderTaskList(filteredTask);
  }
  if (filterState === filterStateStatus.UNDONE) {
    const filteredTask = taskListService.list.filter(filterByUndone);
    renderTaskList(filteredTask);
  }
}

function renderTaskList(passTask = taskListService.list) {
  const { list } = domElements;
  list.innerHTML = "";
  if (passTask.length === 0) {
    list.innerHTML = "Список задач пуст";
  } else {
    passTask.forEach((task) => {
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
    taskListService.create(input.value);
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
  taskListService.deleteById(task.id);
  updateTasks();
}

function doneTask(task) {
  taskListService.toggleTaskById(task.id);
  updateTasks();
}

function getLocalStorageItems() {
  const items = JSON.parse(localStorage.getItem(LSK_TASKS));

  return items || [];
}

function updateLocalStorageItems() {
  localStorage.setItem(LSK_TASKS, JSON.stringify(taskListService.list));
}

function updateTasks() {
  renderTaskListByFilter();
  updateLocalStorageItems();
}

function filterByDone(task) {
  return task.checked;
}

function filterByUndone(task) {
  return !task.checked;
}

function removeFilterClassOnButtons() {
  const { btnAllTasks, btnDoneTasks, btnUndoneTasks } = domElements;
  btnDoneTasks.classList.remove("filter__button-check");
  btnUndoneTasks.classList.remove("filter__button-check");
  btnAllTasks.classList.remove("filter__button-check");
}

domElements.btnAllTasks.addEventListener("click", function() {
  if (filterState !== filterStateStatus.ALL) {
    const { btnAllTasks } = domElements;

    filterState = filterStateStatus.ALL;
    removeFilterClassOnButtons();
    btnAllTasks.classList.add("filter__button-check");
    renderTaskListByFilter();
  }
})

domElements.btnDoneTasks.addEventListener("click", function() {
  if (filterState !== filterStateStatus.DONE) {
    const { btnDoneTasks } = domElements;

    filterState = filterStateStatus.DONE;
    removeFilterClassOnButtons();
    btnDoneTasks.classList.add("filter__button-check");
    renderTaskListByFilter();
  }
})

domElements.btnUndoneTasks.addEventListener("click", function() {
  if (filterState !== filterStateStatus.UNDONE) {
    const { btnUndoneTasks } = domElements;

    filterState = filterStateStatus.UNDONE;
    removeFilterClassOnButtons();
    btnUndoneTasks.classList.add("filter__button-check");
    renderTaskListByFilter();
  }
})