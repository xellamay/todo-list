import { v4 as uuid } from 'uuid';

document.addEventListener("DOMContentLoaded", init);

const LSK_TASKS = "tasks";

const tasks = getLocalStorageItems();

function init() {
  initAddTaskForm();
  renderTaskList();
};

function initAddTaskForm() {
  const form = document.querySelector("#form");
  const submitBtn = document.querySelector("#form-submit-btn");
  const inputName = form.name;

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (inputName.value) {
      tasks.push({
        id: uuid(),
        name: inputName.value,
        checked: false
      });
      updateTasks();
      form.reset();
    }
    
    inputName.focus();
  });
  
  inputName.addEventListener("keyup", function() {
    if (inputName.value) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  })
}

function renderTaskList() {
  const list = document.querySelector("#list");
  list.innerHTML = "";

  if (tasks.length) {
    tasks.forEach(function(task) {
      const newTask = createToDoElement(task)
      list.append(newTask)
    })
  } else {
    list.innerHTML = "Список задач пуст, чтобы добавить задачу воспользуйтесь формой выше"
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

  // Подготовка checkbox
  const checkboxNode = node.querySelector(".list-item__checkbox");
  checkboxNode.onclick = () => doneTask(task);
  checkboxNode.checked = task.checked;

  // Зачеркивание
  if (task.checked) {
    node.querySelector(".list-item__text").classList.add("list-item__text_line");
  }

  // Подготовка кнопки
  node.querySelector(".list-item__btn-del").onclick = () => deleteToDoElement(task);

  return node;
}

function deleteToDoElement(task) {
  tasks.splice(task.id, 1);
  updateTasks()
}

function doneTask(task) {
  const taskIndex = tasks.findIndex(function(el) {
    return el.id === task.id
  });
  
  if (taskIndex !== -1) {
    const taskInList = tasks[taskIndex]
    taskInList.checked = !taskInList.checked;
    updateTasks();
  }
}

function updateTasks() {
  renderTaskList();
  updateLocalStorageItems();
}

function updateLocalStorageItems() {
  localStorage.setItem(LSK_TASKS, JSON.stringify(tasks))
}

function getLocalStorageItems() {
  const items = JSON.parse(localStorage.getItem(LSK_TASKS));

  return items || [];
}

